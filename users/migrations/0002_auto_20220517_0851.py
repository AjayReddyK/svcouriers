# Generated by Django 3.2.12 on 2022-05-17 08:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='address',
            field=models.TextField(blank=True, max_length=500, verbose_name='address'),
        ),
        migrations.AlterField(
            model_name='newuser',
            name='mobile',
            field=models.CharField(max_length=10, unique=True),
        ),
    ]
