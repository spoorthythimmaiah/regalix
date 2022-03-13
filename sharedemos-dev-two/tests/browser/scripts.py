import smtpd
import asyncore


class CustomSMTPServer(smtpd.SMTPServer):

    def process_message(self, peer, mailfrom, rcpttos, data):
        recipient = rcpttos[0]
        file_name = recipient[:-10] + '.html'
        try:
            new_file = open('tmp/' + file_name, 'w')
            new_file.write(data)
            new_file.close()
        except Exception, e:
            print(e)
        return


server = CustomSMTPServer(('127.0.0.1', 1025), None)

asyncore.loop()
