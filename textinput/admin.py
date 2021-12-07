from django.contrib import admin
from textinput.models import data_record, data_record_dev
# Register your models here.


class GeneratedAdmin(admin.ModelAdmin):
    fields = ['id','user_ip','user_content','topics_generated','topics_chosen','topics_added','timestamp']

admin.site.register(data_record,GeneratedAdmin)
admin.site.register(data_record_dev,GeneratedAdmin)