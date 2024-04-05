# Generated by Django 5.0.3 on 2024-04-05 09:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Connection',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('subject', models.CharField(max_length=255)),
                ('body', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Search',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('query', models.CharField(max_length=255)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('url', models.URLField()),
                ('date_uploaded', models.DateTimeField(auto_now_add=True)),
                ('views', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='ConnectionStatus',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('status', models.CharField(max_length=255)),
                ('connection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='statuses', to='main.connection')),
            ],
        ),
        migrations.CreateModel(
            name='VideoThumbnail',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('thumbnail', models.ImageField(upload_to='videos/')),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='thumbnails', to='main.video')),
            ],
        ),
    ]
