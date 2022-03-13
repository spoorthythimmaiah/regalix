"""Repository Manager utility module."""
import json
import requests


from cryptography.fernet import Fernet

from flask import current_app

from sharedemos.libs.exceptions import SharedemosException


def encrypt_password(password):
    """Take a password and encrypt it."""
    cipher_suite = Fernet(
        current_app.config["REPOSITORY_SERVICE_SECRET_KEY"]
    )
    return cipher_suite.encrypt(str(password))


def decrypt_password(cipher_text):
    """Take a encrypted passwod and decrypt it."""
    cipher_suite = Fernet(
        current_app.config["REPOSITORY_SERVICE_SECRET_KEY"]
    )
    return cipher_suite.decrypt(str(cipher_text))


def establish_repository_connection(data):
    """
    Establish connenction with repository instance.

    params:
        "site_url": repository url,
        "root_folder_path": folder under repository instance,
        "user_name": repository instance username,
        "user_password": repository instance password,
        "environment": current_app.config["PROJECT_ENV"]
    Return a repository connection response.
    """
    # Send a POST request to 'repository register_tenant' api ,
    # with respective repository instance details.
    response = None
    status_code = None
    try:
        auth = requests.auth.HTTPBasicAuth(
            current_app.config["REPOSITORY_SERVICE_USERNAME"],
            current_app.config["REPOSITORY_SERVICE_PASSWORD"]
        )
        response = requests.post(
            url=current_app.config["REPOSITORY_SERVICE_REGISTER_URL"],
            auth=auth,
            headers={"Content-type": "application/json"},
            data=json.dumps(data)
        )
        status_code = response.status_code
        response = response.json()

    except Exception as e:
        raise SharedemosException(400, message=e.message)

    else:
        if (
            status_code != 200 or
            response.get("status") == u"failed"
        ):
            raise SharedemosException(
                400, message=response.get("status_code"))

        return response


def fetch_repository_folders(client_token):
    """Fetch all folders for given client token."""
    response = None
    status_code = None
    try:
        auth = requests.auth.HTTPBasicAuth(
            current_app.config["REPOSITORY_SERVICE_USERNAME"],
            current_app.config["REPOSITORY_SERVICE_PASSWORD"]
        )

        response = requests.post(
            url=current_app.config["REPOSITORY_SERVICE_LISTING_URL"],
            auth=auth,
            headers={"Content-type": "application/json"},
            data=json.dumps({
                "client_token": client_token
            })
        )
        status_code = response.status_code
        response = response.json()
    except Exception as e:
        raise SharedemosException(400, message=e.message)

    else:
        if (
            status_code != 200 or
            response.get("status") != "success"
        ):
            raise SharedemosException(
                status_code, message=response.get("status_message"))

        return response


def initiate_sync_process(client_token):
    """
    Intiate sync process for a given client_token.

    send a request to repository service's sync_on_demand
    along with callback url(where content creation and further business
    logic will take place)
    param:
        client_token
    """
    response = None
    status_code = None
    try:
        auth = requests.auth.HTTPBasicAuth(
            current_app.config["REPOSITORY_SERVICE_USERNAME"],
            current_app.config["REPOSITORY_SERVICE_PASSWORD"]
        )

        response = requests.post(
            url=current_app.config["REPOSITORY_SERVICE_SYNC_URL"],
            auth=auth,
            headers={"Content-type": "application/json"},
            data=json.dumps({
                "client_token": client_token
            })
        )
        status_code = response.status_code
        response = response.json()

    except Exception as e:
        raise SharedemosException(400, message=e.message)

    else:
        if (
            status_code != 200 or
            response.get("status") != "success"
        ):
            raise SharedemosException(
                status_code, message=response.get("status_message"))

        return response
