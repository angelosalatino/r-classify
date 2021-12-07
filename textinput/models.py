from djongo import models


# Create your models here.

class Abstract_input(models.Model):
    abstract_text = models.CharField(max_length=5000)


class Generated_data(models.Model):
    abstract_text = models.CharField(max_length=5000)
    topics_chosen = models.CharField(max_length=5000)

class data_save(models.Model):
    id = models.IntegerField(primary_key=True)
    user_ip = models.CharField(max_length=39)
    user_content = models.CharField(max_length=5000)
    topics_generated = models.JSONField()
    topics_chosen = models.CharField(max_length=5000)
    added_topics = models.CharField(max_length=5000)
    timestamp = models.DateTimeField()

class data_record(models.Model):
    id = models.CharField(max_length = 50, primary_key=True)
    user_ip = models.CharField(max_length = 39)
    user_content = models.CharField(max_length=10000)
    topics_generated = models.JSONField()
    topics_chosen = models.JSONField()
    topics_added = models.JSONField()
    timestamp = models.DateTimeField()

class data_record_dev(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    user_ip = models.CharField(max_length=39)
    user_content = models.CharField(max_length=10000)
    topics_generated = models.JSONField()
    topics_chosen = models.JSONField()
    topics_added = models.JSONField()
    timestamp = models.DateTimeField()