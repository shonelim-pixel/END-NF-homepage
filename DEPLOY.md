# Deployment Guide

Since I cannot access your personal Netlify or hosting accounts, I have prepared the site for easy deployment. You can choose one of the following methods:

## Option 1: Netlify Drop (Easiest)
1.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2.  Open your file explorer to this folder:
    `/Users/shonelim/.gemini/antigravity/scratch/end-nf`
3.  Drag and drop the entire `end-nf` folder into the Netlify Drop area.
4.  Your site will be live instantly!

## Option 2: Surge.sh (Command Line)
If you prefer using the terminal and want a free URL quickly:

1.  Open your terminal.
2.  Navigate to the project folder:
    ```bash
    cd /Users/shonelim/.gemini/antigravity/scratch/end-nf
    ```
3.  Run the following command:
    ```bash
    npx surge ./
    ```
4.  Follow the prompts to create a free account (email/password) and choose a domain (e.g., `end-nf-korea.surge.sh`).

## Configuration
I have already included a `netlify.toml` file in the project directory to ensure smooth deployment on Netlify.
