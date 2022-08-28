#  The Web CSO-Classifier
Add badges here.

## Abstract.
In the past few decades, we have observed an ever-increased rate of publication. In such a deluge of research documents it has become harder to find the relevant content. Hence, it is crucial that the research documents are properly annotated with their relevant keywords so to increase their chance of being properly indexed and subsequently retrieved. In this manuscript, we present the Web CSO Classifier, a tool that assists researchers in identifying the most relevant keywords according to a large-scale ontology of research areas.


## Table of contents
Add TOC here.


## About

The Web CSO-Classifier is the successor of ***CSO-Classifier***. It is developed escalate the resourcefulness of ***CSO-Classifier*** to all researchers regardless of their technical, programming and coding abilities, The Web CSO-Classifier empowers researchers to process the research papers using the metadata (such as title, abstract and keywords) and returns the keywords as output for that particular research paper to improve its retrievability.

![image](https://user-images.githubusercontent.com/59340198/187091393-daabdf61-6596-4cbe-abc8-7c91770c359f.png)
**Figure 1**: Architecture of The Web CSO-Classifier

## Getting started
### Prerequisites
The Web CSO-Classifier requires **_Python 3.6.8_** installed on your machine. It can also work with the other versions of the **_Python_**. But, **_Python 3.6.8_** is preferred for the ease and hassle-free setup.

### Setting-Up The Web CSO-Classifier
First of all, setup a virtual environment for the **_Django_**. It is preferred to use  **_Python 3.6.8_** to setup the virtual environment.

You can use the following command to setup the virtual environment.

    ...\> py -m venv project-name

If you want to setup a virtual environment for a particular version of **_Python_**, then following command can be followed.

    ...\> py -m virtualenv -p=<path_py_executable <virtual_environment_directory>

This will create a folder into the root directory of the Web CSO Classifier namely ‘**_project-name_**’ if it does not already exist and setup the virtual environment.

To activate the virtual environment, you can use the following command:

    Windows...\> project-name\Scripts\activate
    Linux and Mac...\> source project-name\bin\activate

This will activate the virtual environment and redirect to the shell or terminal accessing within the virtual environment.

> **_Note:_** virtual environment is needed to be activated each and every time, the terminal is opened.

### Installing the requirements
After, setting up and activating the virtual environment. The next step is to install all the required libraries, dependencies and wheels.

Enter the following command into the terminal accessed within the virtual environment to install all the libraries, dependencies and wheels.

    ...\> pip install –r requirements

#### Unable to install requirements

It is recommended to separately install the **_python-levenshtein_** library, especially if you are trying to setup tool on **_windows._**

To install the **_python-levenshtein_** library, use the following command:

    ...\> pip install python-levenshtein

In case, if you are using **_Anaconda_**, then the following command can also be used:

    ...\> conda install -c conda-forge python-levenshtein

In some cases the library might not be installed using either of the way, then it is recommended to download the .**_whl_** file of **_python-levenshtein_** and then install it manually.

The file or library can be installed, as follows:
- You can find the system compatible **_.whl_** file [here](https://pypi.bartbroe.re/python_levenshtein/)
- Paste the file into the ***site-packages*** folder of virtual environment. ```~/project-name/Lib/site-packages```
- Then, open the terminal in the above mentioned folder and enter the following command: ````pip install {name of the python-levenshtein system compatible file}.whl````
-   Finally the wheel and the library is installed successfully.


## Setting-Up the MongoDB
Now, as the prerequisites are already installed on the system. The database setup exercises can be employed.

First of all, download the **_Community Edition_** version of the **_MongoDB_** and install it with the default settings:

![image](https://user-images.githubusercontent.com/59340198/187091360-299f4fd3-aa4b-4bda-b60f-209e3c6b2052.png)

It is also recommended to install the **MongoDB Compass** along with the **MongoDB**.

After installing the **_MongoDB_**, Create the data directory where **_MongoDB_** stores data:
```
...\> cd C:\

...\> md "\data\db"
```

To start MongoDB, open the terminal in the respective directory where **_MongoDB_** is installed and run following command:

    ...\> C:\Program Files\MongoDB\Server\{mongodb version}\bin\mongod.exe

And, open another terminal into the same directory and run the following command to connect with **_MongoDB_**.

    ...\> C:\Program Files\MongoDB\Server\{mongodb version}\bin\mongo

## Data-Base Migration into the MongoDB:
Again, open the terminal into the virtual environment of the project and run the following commands to migrate the data:

    ...\> python manage.py makemigrations

This command line will check or detect for the possible changes in the ==models.py== file and authorize them for the migration process.

After the completion of the authorization process, following command can be employed to migrate the data:

    ...\> python manage.py migrate

Now, we can run the following command into the **_mongo shell_** to check whether the database namely **_text_** is created or not.

    ...\> show dbs

## Setting-Up Development Server:

Finally, the development process come into the play and development server can be started using the following command:

    ...\> pyhton manage.py runserver

This will run the server on localhost with the homepage at ````localhost:8000/home/````. But unfortunately, that doesn't lead to the employment of all the functionalities of the Web CSO-Classifier.

To employ all the functionalities into the action, download the respective packages using the following commands:
 
To download the ==en_core_web_sm==  package of ==SpaCy== library, following command can be used:
 

    ...\> python -m spacy download en_core_web_sm 

 
And, To download the  Stopwords  package of nltk library, run the Python interpreter of the main version of the Python installed on machine and type the commands: 
 

    >>> import nltk
    >>> nltk.download() 

 
Note: It is necessary that nltk package must be installed on the main version of Python to execute the above mentioned commands.
 
Now, run development server and ***woohoo***, everything will work perfectly fine.


## Fields and features of the Data-Base:

- **User IP address** : It stores the IP address of the user.
- **User Content** : It's the content that the user has given as input to the classifier (the **Abstract** of the paper).
- **Topics Generated** : The topics returned by the CSO Classifier.
- **Topics Chosen** : Topics that are being chosen by the user.
- **Topics Added** : Lists the topics added by the authors and not returned by the CSO Classifier.
- **Timestamp** : It records the date and time at which the document or the text (**Abstract**) has been processed.

## Creating an Admin User for Django Admin-Panel:
The very first **_user_** who can login to the admin site can be created by run the following command: ````...\> python manage.py createsuperuser````

To the desired **_username_** and **_password_** the following commands can be used:
```
...\> Username: admin

...\> Password: **********

...\> Password (again): *********

...\> Superuser created successfully.
```
While the other **_users_** can be added by accessing the **_admin-panel_**, and the number of users can be as many as desired.

## Setup Procedurals for GROBID (GeneRation Of BIbliographic Data):
To setup the GROBID on localhost or local server as well as on the remote server the following are the pre-requisites:

 - Java development kit-8
	 - 
	 - GROBID requires **_jar_** tools to setup the environment for its server and it is preferred to install JDK-8  as GROBID is not compatible with JDK-10 and JDK-11 . The following command can be employed to install JDK-8: ````Linux...\> sudo apt install openjdk-8-jdk-headless````
- Java runtime environment
	- 
	- It is necessary to install JRE as GROBID requires JRE tools to initiate as well as to conduct its functionalities. To install JRE the following command can be used: ````Linux...\> sudo apt install default-jre````

---
After the installation of pre-requisites, it is necessary to add **_JAVA_** to the environment variables, and it would be good lodge the following commands to add **_JAVA_** to the environment variables:

- Setup JAVA_HOME path: 
```
Linux...\> sudo apt install default-jre 

Linux...\> echo $JAVA_HOME {To check whether the JAVA_HOME path has been successfully saved.}
```
- To add Java bin directory to path:

```
Linux...\> export PATH=$PATH:$JAVA_HOME/bin

Linux...\> echo $PATH {To check path variable.}
```		

 - To test Java setup:
 ```
Linux...\> java -version
 ```
---
Thus, the pre-requisites are successfully installed and setup-ed. Now, it is time to hit the GROBID:

**Download the latest stable version of GROBID**
The following command can be used to download the latest stable version of GROBID: 
```
Linux...\> wget https://github.com/kermitt2/grobid/archive/0.7.0.zip
```
Now, unzip the file and enter into the directory: 
```
Linux...\> unzip grobid-0.7.0.zip Linux...\> cd grobid-0.7.0
 ```

**Installation exercises of GROBID**

The standard method for building GROBID is to use gradle. The following command supposed to be employed to build the GROBID:
```
Linux...\> ./gradlew clean install
```
The above mentioned command will install the gradle, which is a crucial tool to build and run GROBID services.

After the building processes are done, the installation processes can be taken into the account by using the following command:
```
Linux...\> ./gradlew run
```
This command will initiate the GROBID services and setup the GROBID server, that can be accessed at the respective address:
```
...\> 127.0.0.1:8070
```
The below mentioned addresses can be used to see the activity status of the GROBID:
```
...\> 127.0.0.1:8070/api/isalive {To check whether the GROBID is running or not.}
```
If the above mentioned address returns true that means the GROBID server is running.

And, the following addresses will give access to GROBID's admin panel and tell us about the currently employed version of the GROBID, respectively:
```
...\> 127.0.0.1:8071 {To access admin panel.}

...\> 127.0.0.1:8070/api/version
````
**_Note:_** Please make sure that GROBID is installed in a path with no parent directories containing spaces.
