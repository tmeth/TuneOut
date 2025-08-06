from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from datetime import datetime

# Set up the WebDriver (Chrome in this case)
driver = webdriver.Chrome()
driver.get("https://main.df5m60ph99c5w.amplifyapp.com")

try:
    # Wait for the title to appear
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//h1[text()='TuneOut']"))
    )

    # Check subtitle
    subtitle = driver.find_element(By.XPATH, "//p[contains(text(), 'TuneOut the silence')]")
    assert subtitle is not None

    # Check "Create Playlist" button
    create_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Create Playlist')]")
    assert create_button.is_displayed()

    # Wait for playlists to load or check for empty message
    try:
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CLASS_NAME, "card"))
        )
        print("Playlists loaded successfully.")
    except:
        empty_msg = driver.find_element(By.XPATH, "//p[contains(text(), 'No playlists available')]")
        assert empty_msg is not None
        print("No playlists available message displayed.")


    create_button.click()


    title_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "playlistTitle"))
    )
    author_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "playlistAuthor"))
    )
    title="Test Title"+str(time.time())
    title_input.send_keys(title)
    author_input.send_keys("Test Author"+str(time.time()))

    song_title_input = WebDriverWait(driver, 10).until(
        # select by placeholder
        EC.presence_of_element_located((By.ID, "songTitle"))
    )
    song_artist_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "songArtist"))
    )
    song_duration_input = WebDriverWait(driver, 10).until( 
        EC.presence_of_element_located((By.ID, "songDuration"))
    )
    song_title = "Test Song Title"+str(time.time())
    song_title_input.send_keys(song_title)
    song_artist_input.send_keys("Test Song Artist"+str(time.time()))
    
    now = datetime.now()
    formatted_time = f"{now.hour}:{now.minute}"

    song_duration_input.send_keys(formatted_time)

    add_song_button = driver.find_element(By.ID, "addSong")
    add_song_button.click()
    print("Song added")

    submit_button = driver.find_element(By.ID, "submitPlaylist")
    submit_button.click()  
    print("Playlist submitted")


    # now delete the playlist
    song_card = WebDriverWait(driver, 10).until(
        # find the card with the song_title and title
        EC.element_to_be_clickable((By.CSS_SELECTOR, "div.card"))
    )
    try:
        delete_button = song_card.find_element(By.CSS_SELECTOR, "[text.contains(text(), 'Delete')]")
    except:
    # if not delete_button:
        delete_button = song_card.find_element(By.XPATH, "//button[contains(text(), 'Delete')]")
    delete_button.click()

    delete_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Delete')]"))
    )
    delete_button.click()
    print("Playlist deleted")

    # check to make sure the playlist is deleted
    try:
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//p[contains(text(), title)]"))
        )
        print("Playlist deletion failed, still exists.")     
    except:
        print("Playlist deleted successfully.")





     # test adding a song to an existing playlist
    existing_playlist = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "div.card"))
    )
    open_playlist_button = existing_playlist.find_element(By.XPATH, ".//button[contains(text(), 'Open')]")
    open_playlist_button.click()
    print("Opened existing playlist")
    
    # Wait for the song input fields to appear 
    song_title_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "songTitle"))
    )
    song_artist_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "songArtist"))
    )
    song_duration_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "songDuration"))
    )
    song_title = "Test Song Title"+str(time.time())
    song_title_input.send_keys(song_title)
    song_artist_input.send_keys("Test Song Artist"+str(time.time()))
    now = datetime.now()
    formatted_time = f"{now.hour}:{now.minute}"
    song_duration_input.send_keys(formatted_time)
    add_song_button = driver.find_element(By.ID, "addSong")
    add_song_button.click()
    print("Song added to existing playlist")
    # Verify the song was added
    song_card = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, f"//p[contains(text(), '{song_title}')]"))
    )
    assert song_card is not None
    print("Song addition verified.")

except Exception as e:
    print(f"An error occurred: {e}")
   

finally:

    print("Done.")

# keep the browser open for a while to see the result
    time.sleep(10)
    driver.quit()