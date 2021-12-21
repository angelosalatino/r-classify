from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound
from django.core.files.uploadhandler import TemporaryFileUploadHandler
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
import json
import os
import sys
import uuid
import shutil
import xmltodict
from pathlib import Path
from grobid_client.grobid_client import GrobidClient
from grobid_client.grobid_client import GrobidClient
from .models import data_record, data_record_dev
from .forms import abstractForm, pdfForm, pdftextform
from .cso_classifier.classifier import classifier
from datetime import datetime, timedelta
from ipware import get_client_ip
import configparser
import requests
import pytz
import pdb

dir_pdf = os.path.dirname(os.path.realpath(__file__))
DEBUG = True 

def home_view(request, abs_text=None):
    times_accessed = request.session.get('access', None)
    config = configparser.ConfigParser()
    config.read('config.ini')
    request.session['max_access'] = int(config['SESSION']['usespersession'])
    if times_accessed is None:
        print(config.sections())
        request.session['access'] = 0

        request.session.set_expiry(int(config['SESSION']['sessionlifetime']))
    return render(request, 'textinput/newindex.php',
                  {'form': abstractForm, "pdf_django_form": pdfForm, "pdf_text_form": pdftextform})


def abstract_input(request):
    if request.method == 'POST':
        abstract_text = request.POST['abstract_text']
        return return_topics(request, abstract_text)
        



def pdf_input_old(request):
    config = configparser.ConfigParser()
    config.read('config.ini')     
    if request.method == "POST":
        # id_paper_input = (os.path.join(dir_pdf, 'resources\\input_pdf\\')) + uuid.uuid4().hex + '_' + str(datetime.now().date()) + '_' + str(datetime.now().time()).replace(':', '.')
        # id_paper_output = (os.path.join(dir_pdf, 'resources\\output_pdf\\')) + uuid.uuid4().hex + '_' + str(datetime.now().date()) + '_' + str(datetime.now().time()).replace(':', '.')
        #--------!-------
        temporary_folder = "{}_{}_{}".format(uuid.uuid4().hex, str(datetime.now().date()), str(datetime.now().time()).replace(':', '.'))
        id_paper_input = os.path.join(dir_pdf, 'resources', 'input_pdf', temporary_folder)
        id_paper_output = os.path.join(dir_pdf, 'resources', 'output_pdf', temporary_folder)
        
        uploaded_files = request.FILES.get("pdf_paper")
        file_path = default_storage.save('media.pdf', ContentFile(uploaded_files.read()))
        tmp_file = os.path.join(settings.MEDIA_ROOT, file_path)
        if not os.path.exists(id_paper_input):
            os.makedirs(id_paper_input)
            os.makedirs(id_paper_output)
            if DEBUG: print("Directory " , id_paper_input, id_paper_output, " Created ")
            shutil.copy(tmp_file, id_paper_input)
        else:    
            if DEBUG: print("Directory " , id_paper_input ,  " already exists")  
        client = GrobidClient(config['GROBID_SETTINGS']['grobid_server'], config['GROBID_SETTINGS']['grobid_port'])
        client.process("processHeaderDocument", id_paper_input, id_paper_output, consolidate_citations=True, force=True)

# Condition to choose between Curl API and GROBID web interface       

# Curl API

        if os.stat(id_paper_output).st_size == 0:
            for file in Path(id_paper_input).iterdir():
                if file.suffix == '.pdf':
                    with open(file, 'rb') as file:
                        files = {
                            'input': file.read()
                        }
                    
                    # response = requests.post('https://cso.kmi.open.ac.uk/grobid-test/api/processHeaderDocument', files=files)
                    
                    the_url = "http://" + config['GROBID_SETTINGS']['grobid_server']
                    if len(config['GROBID_SETTINGS']['grobid_port']) > 0:
                        the_url += ":" + config['GROBID_SETTINGS']['grobid_port']
                    the_url += "/api/processHeaderDocument"
                    
                    response = requests.post(the_url, files=files)
                    
                    paper_dict = xmltodict.parse(response.text)

# GROBID web interface Client

        else:
            for file in Path(id_paper_output).iterdir():
                if file.suffix == '.xml':
                    with open(file, 'r', encoding='utf-8') as file:
                        xml = file.read()
                        paper_dict = xmltodict.parse(xml)

# Process title, abstract and keywords

             
        try:
            title = paper_dict['TEI']['teiHeader']['fileDesc']['titleStmt']['title']['#text']
        except:
            title = ""
            if DEBUG: print("Unable to find title")
        try:
            abstract = paper_dict['TEI']['teiHeader']['profileDesc']['abstract']['p']
        except:
            abstract = ""
            if DEBUG: print("Unable to find abstract")
        
        try:
            if "term" in paper_dict['TEI']['teiHeader']['profileDesc']['textClass']['keywords']:
                keywords = ", ".join(paper_dict['TEI']['teiHeader']['profileDesc']['textClass']['keywords']['term'])
            else:
                keywords = paper_dict['TEI']['teiHeader']['profileDesc']['textClass']['keywords']
        except:
            keywords = ""
            if DEBUG: print("Unable to find keywords")

# Dump processed xml to python dictionary

        pdf_class = {"title": title, "abstract": abstract, "keywords": keywords }
        shutil.rmtree(id_paper_input)
        shutil.rmtree(id_paper_output)
        os.remove(tmp_file)
        return HttpResponse(
            json.dumps(pdf_class),
            content_type = "application/json"
        )
    
    

def pdf_input(request):
    config = configparser.ConfigParser()
    config.read('config.ini')     
    if request.method == "POST":
        # id_paper_input = (os.path.join(dir_pdf, 'resources\\input_pdf\\')) + uuid.uuid4().hex + '_' + str(datetime.now().date()) + '_' + str(datetime.now().time()).replace(':', '.')
        # id_paper_output = (os.path.join(dir_pdf, 'resources\\output_pdf\\')) + uuid.uuid4().hex + '_' + str(datetime.now().date()) + '_' + str(datetime.now().time()).replace(':', '.')
        
        temporary_folder = "{}_{}_{}".format(uuid.uuid4().hex, str(datetime.now().date()), str(datetime.now().time()).replace(':', '.'))
        id_paper_input = os.path.join(dir_pdf, 'resources', 'input_pdf', temporary_folder)
        id_paper_output = os.path.join(dir_pdf, 'resources', 'output_pdf', temporary_folder)
        
        uploaded_files = request.FILES.get("pdf_paper")
        file_path = default_storage.save('media.pdf', ContentFile(uploaded_files.read()))
        tmp_file = os.path.join(settings.MEDIA_ROOT, file_path)
        if not os.path.exists(id_paper_input):
            os.makedirs(id_paper_input)
            os.makedirs(id_paper_output)
            if DEBUG: print("Directory " , id_paper_input, id_paper_output, " Created ")
            shutil.copy(tmp_file, id_paper_input)
        else:    
            if DEBUG: print("Directory " , id_paper_input ,  " already exists") 
            

####### Curl API
        try:
            if True:#config['GROBID_SETTINGS']['use_curl']:
                if DEBUG: print("I am accessing Grobid through the CURL")
                for file in Path(id_paper_input).iterdir():
                    if file.suffix == '.pdf':
                        with open(file, 'rb') as file:
                            files = {
                                'input': file.read()
                            }
                        
                        # response = requests.post('https://cso.kmi.open.ac.uk/grobid-test/api/processHeaderDocument', files=files)
                        #### TEST CONNECTION!!
                        the_url = "http://" + config['GROBID_SETTINGS']['grobid_server']
                        if len(config['GROBID_SETTINGS']['grobid_port']) > 0:
                            the_url += ":" + config['GROBID_SETTINGS']['grobid_port']
                        the_url += "/api/processHeaderDocument"
                        
                        response = requests.post(the_url, files=files)
                        #### ADD try 
    
                        paper_dict = xmltodict.parse(response.text)
    
                
                
            else: 
                if DEBUG: print("I am running the Grobid Python Client")
    ####### THROUGH PYTHON GROBID CLIENT
                client = GrobidClient(config['GROBID_SETTINGS']['grobid_server'], config['GROBID_SETTINGS']['grobid_port'])
                client.process("processHeaderDocument", id_paper_input, id_paper_output, consolidate_citations=True, force=True)
                
                for file in Path(id_paper_output).iterdir():
                    if file.suffix == '.xml':
                        with open(file, 'r', encoding='utf-8') as file:
                            xml = file.read()
                            paper_dict = xmltodict.parse(xml)
    
         
    
    
    # GROBID web interface Client
    # Condition to choose between Curl API and GROBID web interface  
    # if os.stat(id_paper_output).st_size == 0:
    # else:
    
    
    # Process title, abstract and keywords
    
                 
            try:
                title = paper_dict['TEI']['teiHeader']['fileDesc']['titleStmt']['title']['#text']
            except:
                title = ""
                if DEBUG: print("Unable to find title")
            try:
                abstract = paper_dict['TEI']['teiHeader']['profileDesc']['abstract']['p']
            except:
                abstract = ""
                if DEBUG: print("Unable to find abstract")
            
            try:
                if "term" in paper_dict['TEI']['teiHeader']['profileDesc']['textClass']['keywords']:
                    keywords = ", ".join(paper_dict['TEI']['teiHeader']['profileDesc']['textClass']['keywords']['term'])
                else:
                    keywords = paper_dict['TEI']['teiHeader']['profileDesc']['textClass']['keywords']
            except:
                keywords = ""
                if DEBUG: print("Unable to find keywords")
    
    # Dump processed xml to python dictionary
    
            pdf_class = {"title": title, "abstract": abstract, "keywords": keywords }
        except:
            pdf_class = {"title": "", "abstract": "", "keywords": ""}
        
        shutil.rmtree(id_paper_input)
        shutil.rmtree(id_paper_output)
        os.remove(tmp_file)
        return HttpResponse(
            json.dumps(pdf_class),
            content_type = "application/json"
        )



def return_topics(request, text):
    request.session['access'] = request.session['access'] + 1
    if request.session['access'] > request.session['max_access']:
        return None
    topic_list, provenance = run_classifier(text)
    if topic_list is None:
        return HttpResponseNotFound("<p>Too many accesses.</p>")
    response_data = generate_record(request, text, topic_list, provenance)
    return HttpResponse(
        json.dumps(response_data),
        content_type="application/json"
    )


def run_classifier(text):
    config = configparser.ConfigParser()
    config.read('config.ini')
    ######## TO BE REMOVED
    # This section will be removed in the future including all dependencies to 'provenance'
    if config['RESOURCE']['classifier'] == 'None':
        return classifier.run_cso_classifier(text), "local"
    ######## END REMOVING
    else:
        url = config['RESOURCE']['classifier']
        data = {"paper": text}
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        return requests.post(url, data=json.dumps(data), headers=headers), "remote"


def generate_record(request, content, topic_list, provenance):
    if provenance == "remote":
        if type(topic_list) == requests.models.Response:
            if type(topic_list.text) == str:
                topic_list = json.loads(topic_list.text)
        else:
            print("Mismatch provenance and response")  # we need to generate and exception here to handle it properly
    record_id = request.session.session_key + "_" + str(request.session['access'])
    request.session['id'] = record_id
    ip_address, is_routable = get_client_ip(request)
    if ip_address is None:
        print("IP address not found")
        ip_address = "127.0.0.1"
    ######## TO BE FIXED: depends on provenance
    t_topic_list = topic_list['list']['extracted'] if provenance == "remote" else topic_list['union']
    data = {'id':record_id, 'user_ip':ip_address, 'content': content, 'topics' : t_topic_list, 'topics_chosen': [], 'topics_added': [], 'timestamp': datetime.now(pytz.timezone('Europe/London'))}
    save_to_db(data)
    response_data = {'abstract_text':content}
    if provenance == "remote":
        response_data['topic_list'] = topic_list['list']['extracted']
        response_data['explanation'] = topic_list['verbose']
    ######## TO BE REMOVED 
    # depends on provenance
    elif provenance == "local":
        response_data['topic_list'] = topic_list['union']
        response_data['explanation'] = topic_list['explanation']
    ######## END REMOVING
    return response_data


def save_topics(request):
    if request.method == 'POST':
        topics_chosen = convert_json(request.POST['topics_chosen'])
        added_topics = convert_json(request.POST['added_topics'])
        timestamp = datetime.now(pytz.timezone('Europe/London'))
        config = configparser.ConfigParser()
        config.read('config.ini')
        if config['VERSION']['development'] == 'true':
            record = data_record_dev.objects.get(id=request.session['id'])
        else:
            record = data_record.objects.get(id=request.session['id'])
        record.topics_chosen = topics_chosen
        record.topics_added = added_topics
        record.timestamp = timestamp
        record.save()
        response_data = {'topics_list': topics_chosen}
        return HttpResponse(json.dumps(response_data), content_type='application/json')

def save_to_db(data):
    config = configparser.ConfigParser()
    config.read('config.ini')
    if config['VERSION']['development'] == 'true':
        record = data_record_dev(data['id'],data['user_ip'],data['content'],data['topics'],data['topics_chosen'],data['topics_added'], datetime.now(pytz.timezone('Europe/London')))
        record.save()
    else:
        record = data_record(data['id'], data['user_ip'],data['content'], data['topics'], data['topics_chosen'],data['topics_added'], datetime.now(pytz.timezone('Europe/London')))
        record.save()


def convert_json(text):
    if len(text) == 0:
        return []
    text = text.replace("}{", ",")
    text = text.replace("{", "")
    text = text.replace("}", "")
    return text.split(",")
