FROM ubuntu:14.04
MAINTAINER adarshs@regalix-inc.com

# Add the PostgreSQL PGP key to verify their Debian packages.
# It should be the same key as https://www.postgresql.org/media/keys/ACCC4CF8.asc
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8

# Add PostgreSQL's repository. It contains the most recent stable release of PostgreSQL, ``9.3``.
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main" > /etc/apt/sources.list.d/pgdg.list

RUN locale-gen en_US.UTF-8
RUN update-locale LANG=en_US.UTF-8

RUN apt-get update && apt-get install -y software-properties-common && add-apt-repository -y ppa:libreoffice/ppa

# Install core system packages(and also weasyprint required packages).
RUN apt-get update && apt-get install -y curl python-dev python-setuptools\
	postgresql-9.3 postgresql-server-dev-9.3\
	redis-server erlang erlang-nox rabbitmq-server\
	supervisor openssh-server libjpeg-dev libxml2-dev\
	libxmlsec1-dev libmagickwand-dev libcairo2-dev libpango1.0-dev\
	libgdk-pixbuf2.0-dev libffi-dev\
	poppler-utils libreoffice unoconv

# wget is the non-interactive network downloader which is used to download files from the server.
# gdebi is a simple tool to install deb files.
# It lets you install local deb packages resolving and installing its dependencies.

# ttf-wqy-zenhei, indic-fonts ,mincho, unfonts-core - fonts support for wkhtmltopdf(export pdf).
# fonts-crosextra-carlito - calibri font support for unoconv(pdf/doc converter)
RUN apt-get update && apt-get install -y fonts-crosextra-carlito ttf-wqy-zenhei\
	fonts-takao-mincho ttf-indic-fonts fonts-unfonts-core

# Install wkhtmltopdf package through wget
RUN apt-get install -y wget gdebi &&\
	wget https://downloads.wkhtmltopdf.org/0.12/0.12.5/wkhtmltox_0.12.5-1.trusty_amd64.deb &&\
	gdebi --n wkhtmltox_0.12.5-1.trusty_amd64.deb &&\
	apt-get -f install && rm wkhtmltox_0.12.5-1.trusty_amd64.deb


# Start rabbitmq-server, add user and grant permission for that user
RUN service rabbitmq-server start &&\
    rabbitmqctl add_user sdemos sdemos &&\
    rabbitmqctl set_permissions -p / sdemos ".*" ".*" ".*" 

# Install pip
RUN easy_install pip

# Install virtualenv
RUN pip install --upgrade pip && pip install virtualenv --ignore-installed six

# Create venv directory
RUN mkdir -p /opt/python/venv

# Create virtual environment
RUN virtualenv /opt/python/venv/sdemos

RUN mkdir /var/run/sshd
RUN echo 'root:sdemos' | chpasswd
RUN sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# Expose the PostgreSQL port
EXPOSE 22 5000 5432

VOLUME ["/docker"]

ADD requirements.txt /

RUN /opt/python/venv/sdemos/bin/pip install -r /requirements.txt

# Setup local node environment
RUN /opt/python/venv/sdemos/bin/nodeenv -p

# Install node packages
ADD package.json /
RUN . /opt/python/venv/sdemos/bin/activate && /opt/python/venv/sdemos/bin/npm install

# Run the rest of the commands as the ``postgres`` user created by the ``postgres-9.3`` package when it was ``apt-get installed``
USER postgres

# Create a PostgreSQL db, role and password
RUN /etc/init.d/postgresql start &&\
    psql --command "CREATE USER sdemos WITH PASSWORD 'sdemos';" &&\
    createdb -O sdemos sdemos_dev --encoding="UTF8" --lc-collate="en_US.UTF-8" --lc-ctype="en_US.UTF-8" &&\
	createdb -O sdemos sdemos_celery --encoding="UTF8" --lc-collate="en_US.UTF-8" --lc-ctype="en_US.UTF-8" &&\
	createdb -O sdemos sdemos_reports --encoding="UTF8" --lc-collate="en_US.UTF-8" --lc-ctype="en_US.UTF-8"

# Adjust PostgreSQL configuration so that remote connections to the database are possible.
RUN echo "host sdemos_dev  sdemos    0.0.0.0/0  md5" >> /etc/postgresql/9.3/main/pg_hba.conf

USER root
ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord"]
