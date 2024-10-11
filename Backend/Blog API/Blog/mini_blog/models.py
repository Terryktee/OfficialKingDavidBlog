from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.conf import settings
from django.contrib.auth.models import User
# Blog Post Model

class Post(models.Model):
    author = models.ForeignKey('auth.User',on_delete=models.CASCADE,related_name ='blog_posts')

    class Status(models.TextChoices):
        Draft='DF','Draft'
        Published = 'PB','Published'

    title=models.CharField(max_length=250)
    slug=models.SlugField(max_length=250)
    image = models.ImageField(upload_to='images/',null=True, blank=True)
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created=models.DateTimeField(auto_now=True)
    status=models.CharField(max_length=2,choices=Status,default=Status.Draft)

    class Meta :
        ordering = ['-publish']
        indexes = [models.Index(fields=['-publish']),]

    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args,**kwargs)
    def formatted_publish_date(self):
        return self.publish.strftime('%B %d, %Y, %I:%M %p') 
    def __str__(self):
        return self.title

