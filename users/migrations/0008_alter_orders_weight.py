# Generated by Django 3.2.12 on 2022-06-03 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_auto_20220603_0459'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orders',
            name='weight',
            field=models.FloatField(default=0),
        ),
    ]
