# Generated by Django 3.2.25 on 2024-04-09 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pacman', '0002_pacmangamescore_level'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pacmangamescore',
            name='level',
            field=models.IntegerField(),
        ),
    ]