import os
import psycopg2
from datetime import date, timedelta
from selenium import webdriver


def before_all(context):
    context.root_url = "http://default:5000"
    context.base_tenant_url = "http://vmw.sharedemos.com:5000"
    # context.browser = webdriver.Firefox()
    context.browser = webdriver.Chrome()
    context.browser.maximize_window()
    context.base_path = os.path.abspath(os.path.dirname(__file__))
    empty_tmp_folder(context)


def after_all(context):
    empty_tmp_folder(context)
    context.browser.quit()


def empty_tmp_folder(context):
    try:
        dirpath = context.base_path + '/tmp'
        if not os.path.exists(dirpath):
            os.makedirs(dirpath)
        filelist = os.listdir(dirpath)
        for fileName in filelist:
            os.remove(dirpath + "/" + fileName)
    except OSError, e:
        print(e)


def before_feature(context, feature):
    if 'set_browser_locale' in feature.tags:
        if "chrome" in context.browser.name:
            options = webdriver.ChromeOptions()
            preferences = {"intl.accept_languages": "zh"}
            options.add_experimental_option("prefs", preferences)
            context.browser = webdriver.Chrome(chrome_options=options)
            context.browser.maximize_window()
        elif "firefox" in context.browser.name:
            profile = webdriver.FirefoxProfile()
            profile.set_preference("intl.accept_languages", "zh")
            context.browser = webdriver.Firefox(firefox_profile=profile)
            context.browser.maximize_window()

    if 'set_browser_locale_with_language_priorities' in feature.tags:
        if "chrome" in context.browser.name:
            options = webdriver.ChromeOptions()
            preferences = {"intl.accept_languages": "de,zh,en"}
            options.add_experimental_option("prefs", preferences)
            context.browser = webdriver.Chrome(chrome_options=options)
            context.browser.maximize_window()
        elif "firefox" in context.browser.name:
            profile = webdriver.FirefoxProfile()
            profile.set_preference("intl.accept_languages", "de,zh,en")
            context.browser = webdriver.Firefox(firefox_profile=profile)
            context.browser.maximize_window()


def after_feature(context, feature):
    if 'set_browser_locale' in feature.tags:
        context.browser.close()

    if 'set_browser_locale_with_language_priorities' in feature.tags:
        context.browser.close()


def before_scenario(context, scenario):
    if 'previous_day' in scenario.tags:
        previous_date_object = date.today() - timedelta(days=1)
        previous_date = previous_date_object.day
        previous_date_month = previous_date_object.month
        previous_date_year = previous_date_object.year
        timestamp_date = str(previous_date_year) + "-0" + str(previous_date_month) + "-" + str(previous_date)
        con = None
        try:
            con = psycopg2.connect(database='sdemos_testing', user='sdemos', password='sdemos')
            cur = con.cursor()
            cur.execute("update activity_feed set created_at=timestamp '" + timestamp_date + "'")
            con.commit()
        except psycopg2.DatabaseError, e:
            print('Error : ', e)
        finally:
            if con:
                con.close()


def before_tag(context, tag):
    if 'sign_in' in tag or 'multilingual' in tag:
        if "chrome" in context.browser.name:
            context.browser = webdriver.Chrome()
            context.browser.maximize_window()
        elif "firefox" in context.browser.name:
            context.browser = webdriver.Firefox()
            context.browser.maximize_window()


def after_tag(context, tag):
    if 'sign_in' in tag or 'multilingual' in tag:
        context.browser.close()
