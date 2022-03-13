ShareDemos
==========
    1. Fork sharedemos repo at https://bitbucket.org/regalix/sharedemos

    2. Clone the forked sharedemos repository to system

        hg clone https://<username>@bitbucket.org/<username>/sharedemos

        OR

        hg clone ssh://hg@bitbucket.org/<username>/sharedemos

    3. Add following lines to .hg/hgrc file

        [hooks]
        precommit = flake8 sharedemos/ tests/ --ignore=E501,E402,F401,N805 && behave -f null tests/console
        
    4. Follow instructions below to setup project for development using Docker

Docker
-------
    1. Download docker and install (https://docs.docker.com/installation/)

    - OSX - Make sure to use the boot2docker with virtualbox guest additions from here - https://medium.com/boot2docker-lightweight-linux-for-docker/boot2docker-together-with-virtualbox-guest-additions-da1e3ab2465c

    2. Change to project folder

    - OSX - boot2docker ssh "ls /Users" (You should see project files here...)

    3. Build docker container (command - 'docker build -t <username>/sdemos .')

    4. Ubuntu / other Linux variants - Start container (command - 'docker run -d --name sdemos_dev -p 10022:22 -p 5000:5000 -v $(pwd):/docker -t -i <username>/sdemos')

    - OSX - Start container (command - 'docker run -d --name sdemos_dev -p 10022:22 -p 5000:5000 -v /Users:/docker -t -i <username>/sdemos')

    5. Login to container (command - 'ssh root@localhost -p 10022' password - 'sdemos')

    - In case of OSX, since boot2docker is the wrapper - the command to login into container will be (command - 'ssh root@$(boot2docker ip) -p 10022')

    6. Code will be available under docker directory (cd /docker/)

    7. Activate pre installed virtualenv 'sdemos' (command - 'source /opt/python/venv/sdemos/bin/activate')

    8. Setup database (command - 'python manage.py db upgrade')

    9. Install all packages in package.json (command - 'npm install')

    10. Check if rabbitmq user is created (command - 'rabbitmqctl list_users')
        The above command should list all rabbitmq users:
        Ex:
        Listing users ...
        guest   [administrator]
        sdemos  []
        ...done.

        if 'sdemos' is not listed, add sdemos user(command - 'rabbitmqctl add_user sdemos sdemos')
        set permission for user(command - 'rabbitmqctl set_permissions -p / sdemos ".*" ".*" ".*"')

    11. Create tenant(command - 'python manage.py create-tenant [-domain <your-domain-name-with-port-number-5000>]')
        ex: python manage.py create-tenant -domain dev.localhost.com:5000
            default account will be created with below credentials
            email: johndoe@example.com
            password: sdemos123

    12. Build webpack and watch any changes to javascript/handlebars files
        (command - './node_modules/.bin/webpack --config=webpack.dev.js')

    13. Run celery(command - 'celery -A sharedemos.tasks.run worker -l info')

    14. Run the application(command - 'python manage.py runserver')

    15. Access the application in browser - http://<your-domain-name>:5000

    16. Stop the container after work/before shutdown (command in host machine - 'docker stop sdemos_dev')

    17. Restart container before starting work (command in host machine - 'docker start sdemos_dev')

Postgresql
----------
    Access database inside guest machine (command - 'psql -U sdemos -h localhost -d sdemos_dev -W' password - 'sdemos')

Application
-----------
    1. Admin - http://<your-domain-name>:5000/admin
    2. API - http://<your-domain-name>:5000/api/<model>[/<slug>]
    3. Player - http://<your-domain-name>:5000/#!/<product-slug>/<section-slug>/<walkthrough-slug>


PhantomJS
---------
    1. Download the PhantomJS from the site 'http://phantomjs.org/'
    2. And extract (unzip) the content. Linux users extract the content in /usr/local/bin directory
