from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from datetime import datetime


# helper function: finds the element based on selector, sends in the data, prints if not found
def input_data(name, selector, data):
    try:
        element=WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(selector)
        )
        element.send_keys(data)
        return data
    except:
        print(data+" was not inputted because the input field "+ name + " was not found.")
        return None

# helper function: finds the button based on the selector and clicks it, prints if not found
def click_button(name, selector):
    try:
        element=WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(selector)
        )
        element.click()
    except:
        print(name+" was not clicked because it was not found.")

# helper function: finds the element based on selector and returns it, returns null and prints if not found
def custom_find_element(name, selector):
    try:
        element=WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(selector)
        )
        return element
    except:
        print(name+" was not found.")
        return None


# Set up the WebDriver (Chrome in this case)
driver = webdriver.Chrome()
driver.get("https://main.df5m60ph99c5w.amplifyapp.com")

try:
    # Wait for the title to appear
    title = custom_find_element("title", (By.XPATH, "//h1[text()='TuneOut']"))
    assert title is not None    

    # Check subtitle
    subtitle = custom_find_element("subtitle", (By.XPATH, "//p[contains(text(), 'TuneOut the silence')]"))
    assert subtitle is not None


    # Check "Create Playlist" button
    create_button = custom_find_element("create playlist button", (By.XPATH, "//button[contains(text(), 'Create Playlist')]"))
    if create_button:
        assert create_button.is_displayed()
    else:
        print("Create Playlist button not found.")


    # wait for playlists to load or check for empty message
    try:
        card=custom_find_element("playlist card", (By.CLASS_NAME, "card"))
        if card:
            print("Playlists loaded successfully.")
        else:
            print("No playlists available message displayed.")
    except:
        empty_msg = driver.find_element(By.XPATH, "//p[contains(text(), 'No playlists available')]")
        assert empty_msg is not None
        print("No playlists available message displayed.")


    # Click the "Create Playlist" button to go to the playlist creation page
    create_button.click()

    print("Attempting to create a new playlist...")

    title=input_data("Playlist Title", (By.ID, "playlistTitle"), "Test Title" + str(time.time()))
    author=input_data("Playlist Author", (By.ID, "playlistAuthor"), "Test Author" + str(time.time()))

    song=input_data("Song Title", (By.ID, "songTitle"), "Test Song Title"+str(time.time()))
    artist=input_data("Song Artist", (By.ID, "songArtist"), "Test Song Artist"+str(time.time()))
    now = datetime.now()
    formatted_time = f"{now.hour}:{now.minute}"
    dur=input_data("Song Duration", (By.ID, "songDuration"), formatted_time)    
    click_button("Add Song", (By.XPATH, "//button[contains(text(), '+')]"))
    click_button("Submit Playlist", (By.ID, "submitPlaylist"))

    # wait to be automatically redirected back to main page
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//h1[text()='TuneOut']"))
    )

    # Verify the new playlist appears on the main page
    new_playlist = custom_find_element("new playlist", (By.XPATH, f"//p[contains(text(), title)]"))
    assert new_playlist is not None
    print("New playlist created and displayed successfully!")


    # Create a playlist with no songs (should not be allowed)
    click_button("Create Playlist", (By.XPATH, "//button[contains(text(), 'Create Playlist')]"))
    xtitle=input_data("Playlist Title", (By.ID, "playlistTitle"), "This playlist should not be added" + str(time.time()))
    input_data("Playlist Author", (By.ID, "playlistAuthor"), "Test Author" + str(time.time()))  
    click_button("Add Song", (By.XPATH, "//button[contains(text(), '+')]"))
    print("Attempted to add a song with empty fields.")
    click_button("Create Playlist", (By.XPATH, "//button[contains(text(), 'Create Playlist')]"))

    # wait to be automatically redirected back to main page
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//h1[text()='TuneOut']"))
    )
    # Check if the song was added --> needs help
    try:
        if(custom_find_element("song card", (By.CSS_SELECTOR, "[div.card.contains(text(), '{xtitle}')]"))): 
            print("Playlist created successfully, but it should not have been.")
        else:
            print("No playlist was created due to empty fields, as expected.")
    except Exception as e:
        print(f"An error occurred while checking for the song: {e}")


    # now delete the playlist
    try:
        song_card = custom_find_element("song card", (By.XPATH, f"//div[contains(text(), '{title}')]"))
        if song_card:
            delete_button = song_card.find_element(By.XPATH, ".//button[contains(text(), 'Delete')]")
            delete_button.click()
            print("Playlist deleted")
        else:
            print("Playlist not found for deletion.")
    except Exception as e:
        print(f"An error occurred while trying to delete the playlist: {e}")

    # check to make sure the playlist is deleted
    try:
        if(custom_find_element("deleted playlist", (By.XPATH, f"//p[contains(text(), '{title}')]"))):
            print("Playlist deletion failed, still exists.")     
    except:
        print("Playlist deleted successfully.")

    
#     song_card = WebDriverWait(driver, 10).until(
#         # find the card with the song_title and title
#         EC.element_to_be_clickable((By.CSS_SELECTOR, "div.card"))
#     )
#     try:
#         delete_button = song_card.find_element(By.CSS_SELECTOR, "[text.contains(text(), 'Delete')]")
#     except:
#     # if not delete_button:
#         delete_button = song_card.find_element(By.XPATH, "//button[contains(text(), 'Delete')]")
#     delete_button.click()

#     delete_button = WebDriverWait(driver, 10).until(
#         EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Delete')]"))
#     )
#     delete_button.click()
#     print("Playlist deleted")

#     # check to make sure the playlist is deleted
#     try:
#         WebDriverWait(driver, 5).until(
#             EC.presence_of_element_located((By.XPATH, "//p[contains(text(), title)]"))
#         )
#         print("Playlist deletion failed, still exists.")     
#     except:
#         print("Playlist deleted successfully.")



#      # Add a song to existing playlist by opening the playlist
#     existing_playlist = WebDriverWait(driver, 10).until(
#         EC.element_to_be_clickable((By.CSS_SELECTOR, "div.card"))
#     )
#     open_playlist_button = existing_playlist.find_element(By.XPATH, ".//button[contains(text(), 'Open')]")
#     open_playlist_button.click()
#     print("Opened existing playlist")
#     add_song_button = WebDriverWait(driver, 10).until(
#         EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Add Song')]"))
#     )
#     add_song_button.click()
#     print("Add song button clicked")
    
#     # Wait for the song input fields to appear 
#     song_title_input = WebDriverWait(driver, 10).until(
#         EC.presence_of_element_located((By.ID, "songTitle"))
#     )
#     song_artist_input = WebDriverWait(driver, 10).until(
#         EC.presence_of_element_located((By.ID, "songArtist"))
#     )
#     song_duration_input = WebDriverWait(driver, 10).until(
#         EC.presence_of_element_located((By.ID, "songDuration"))
#     )
#     song_title = "Test Song Title"+str(time.time())
#     song_title_input.send_keys(song_title)
#     song_artist_input.send_keys("Test Song Artist"+str(time.time()))
#     now = datetime.now()
#     formatted_time = f"{now.hour}:{now.minute}"
#     song_duration_input.send_keys(formatted_time)
#     add_song_button = driver.find_element(By.ID, "addSong")
#     add_song_button.click()
#     print("Song added to existing playlist")

#     # Verify the song was added
#     song_card = WebDriverWait(driver, 10).until(
#         EC.presence_of_element_located((By.XPATH, f"//p[contains(text(), '{song_title}')]"))
#     )
#     assert song_card is not None
#     print("Song addition verified.")


#     # Add a song to existing playlist by pressing "Add Song" button
#     # for this section, verify IDs
#     existing_playlist = WebDriverWait(driver, 10).until(
#         EC.element_to_be_clickable((By.CSS_SELECTOR, "div.card"))
#     )
#     add_song_button_button = existing_playlist.find_element(By.XPATH, ".//button[contains(text(), 'Add Song')]")
#     add_song_button.click()

#     # Wait for the song input fields to appear 
#     song_title_input = WebDriverWait(driver, 10).until(
#         EC.presence_of_element_located((By.ID, "songTitle"))
#     )
#     song_artist_input = WebDriverWait(driver, 10).until(
#         EC.presence_of_element_located((By.ID, "songArtist"))
#     )
#     song_duration_input = WebDriverWait(driver, 10).until(
#         EC.presence_of_element_located((By.ID, "songDuration"))
#     )

#     song_title_input.send_keys("Test Song Title"+str(time.time()))
#     song_artist_input.send_keys("Test Song Artist"+str(time.time()))
#     now = datetime.now()
#     formatted_time = f"{now.hour}:{now.minute}"
#     song_duration_input.send_keys(formatted_time)

#     add_song_button = driver.find_element(By.ID, "addSong")
#     add_song_button.click()
#     print("Song added to existing playlist")

except Exception as e:
    print(f"An error occurred: {e}")
   

finally:

    print("Done.")

# keep the browser open for a while to see the result
    time.sleep(10)
    driver.quit()