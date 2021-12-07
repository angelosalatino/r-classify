import configparser

config = configparser.ConfigParser()
config.sections()

config.read("config.ini")
print(config['DEFAULT']['allowed_hosts'])
