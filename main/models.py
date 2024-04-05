from django.db import models

# Create your models here.

# Video Model
class Video(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField()
    date_uploaded = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.title} {self.description}"

# VideoThumbnail Model
class VideoThumbnail(models.Model):
    id = models.AutoField(primary_key=True)
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name='thumbnails')
    thumbnail = models.ImageField(upload_to='videos/')

    def __str__(self):
        return f"{self.thumbnail} {self.video}"

# Connection Model
class Connection(models.Model):
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.id}"

# ConnectionStatus Model
class ConnectionStatus(models.Model):
    id = models.AutoField(primary_key=True)
    connection = models.ForeignKey(Connection, on_delete=models.CASCADE, related_name='statuses')
    status = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.connection} {self.status}"

# Message Model
class Message(models.Model):
    id = models.AutoField(primary_key=True)
    subject = models.CharField(max_length=255)
    body = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.timestamp}"

# Search Model
class Search(models.Model):
    id = models.AutoField(primary_key=True)
    query = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id} {self.query} {self.timestamp}"