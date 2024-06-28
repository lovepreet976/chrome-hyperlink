import json
import sqlite3

# Set up the SQLite database connection
conn = sqlite3.connect('hyperlinks.db')
c = conn.cursor()

# Create the table if it doesn't exist
c.execute('''CREATE TABLE IF NOT EXISTS hyperlinks
             (url TEXT, occurrence INTEGER)''')

def insert_hyperlink(url, occurrence):
    # Insert or update the hyperlink data in the SQLite database
    c.execute("INSERT OR REPLACE INTO hyperlinks (url, occurrence) VALUES (?, ?)", (url, occurrence))
    conn.commit()

def get_all_hyperlinks():
    # Retrieve all hyperlink data from the SQLite database
    c.execute("SELECT url, occurrence FROM hyperlinks")
    return c.fetchall()

def run_native_app():
    while True:
        # Read the message from the Chrome extension
        message = json.loads(input())

        # Process the hyperlink data and store it in the SQLite database
        for url, occurrence in message['hyperlinks'].items():
            insert_hyperlink(url, occurrence)

if __name__ == "__main__":
    run_native_app()
