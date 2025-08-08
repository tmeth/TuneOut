from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from datetime import datetime

# Set up the WebDriver (Chrome in this case)
driver = webdriver.Chrome()
driver.get("https://main.df5m60ph99c5w.amplifyapp.com")

# helper function: finds the element based on selector, sends in the data, prints if not found
def input_data(name, selector, data):
    try:
        element=WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(selector)
        )
        element.send_keys(data)
    except:
        print(data+" was not inputted because the input field "+ name + " was not found.")

def click_button(name, selector):
    try:
        element=WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(selector)
        )
        element.click()
    except:
        print(name+" was not clicked because it was not found.")

def custom_find_element(name, selector):
    try:
        element=WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(selector)
        )
        return element
    except:
        print(name+" was not found.")
        return None

try:
    # Wait for the title to appear
    title = custom_find_element("title", (By.XPATH, "//h1[text()='TuneOut']"))
    assert title is not None
    
    # Check subtitle
    subtitle = custom_find_element("subtitle", (By.XPATH, "//p[contains(text(), 'TuneOut the silence')]"))
    assert subtitle is not None

    # Check "Create Playlist" button
    create_button = custom_find_element("create playlist button", (By.XPATH, "//button[contains(text(), 'Create Playlist')]"))
    assert create_button.is_displayed()

    # Wait for playlists to load or check for empty message
    try:
        custom_find_element("playlist card", (By.CLASS_NAME, "card"))
        print("Playlists loaded successfully.")
    except:
        empty_msg = driver.find_element(By.XPATH, "//p[contains(text(), 'No playlists available')]")
        assert empty_msg is not None
        print("No playlists available message displayed.")




    # Create a song and leave fields empty
    click_button("Create Playlist", (By.XPATH, "//button[contains(text(), 'Create Playlist')]"))

    input_data("Playlist Title", (By.ID, "playlistTitle"), "This playlist should not be added" + str(time.time()))
    input_data("Playlist Author", (By.ID, "playlistAuthor"), "Test Author" + str(time.time()))

    input_data("Song Title", (By.ID, "songTitle"), "This playlist should not be added")
    input_data("Song Artist", (By.ID, "songArtist"), "artist")
    input_data("Song Duration", (By.ID, "songDuration"), "")    
    click_button("Add Song", (By.XPATH, "//button[contains(text(), '+')]"))
    print("Attempted to add a song with empty fields.")

    create_button = custom_find_element("Create Playlist Button", (By.XPATH, "//button[contains(text(), 'Create Playlist')]"))
    assert create_button is not None
    assert create_button.is_displayed()
    create_button.click()

    # wait to be automatically redirected back to main page
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//h1[text()='TuneOut']"))
    )
    # Check if the song was added
    try:
        song_card = custom_find_element("song card", (By.XPATH, "//div[contains(text(), 'This playlist should not be added')]")
        )
        if song_card:
            print("Song was added successfully, but it should not have been.")
        else:
            print("No song was added due to empty fields, as expected.")
    except Exception as e:
        print(f"An error occurred while checking for the song: {e}")




except Exception as e:
    print(f"An error occurred: {e}")
   

finally:
    print("Done.")

# keep the browser open for a while to see the result
    time.sleep(10)
    driver.quit()