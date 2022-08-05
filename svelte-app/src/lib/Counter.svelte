<script lang="js">
  /* exported gapiLoaded */
  /* exported gisLoaded */
  /* exported handleAuthClick */
  /* exported handleSignoutClick */

  const clientId = window["CLIENT_ID"];
  const apiKey = window["API_KEY"];
  // Discovery doc URL for APIs used by the quickstart
  const DISCOVERY_DOC =
    "https://sheets.googleapis.com/$discovery/rest?version=v4";

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

  let tokenClient;
  let gapiInited = false;
  let gisInited = false;

  /**
   * Callback after api.js is loaded.
   */
  function gapiLoaded() {
    // @ts-ignore
    gapi.load("client", intializeGapiClient);
  }

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async function intializeGapiClient() {
    // @ts-ignore
    await gapi.client.init({
      apiKey: apiKey,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  function gisLoaded() {
    // @ts-ignore
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPES,
      callback: "", // defined later
    });
    gisInited = true;
    maybeEnableButtons();
  }

  /**
   * Enables user interaction after all libraries are loaded.
   */
  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      document.getElementById("authorize_button").style.visibility = "visible";
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
      document.getElementById("signout_button").style.visibility = "visible";
      document.getElementById("authorize_button").innerText = "Refresh";
      await listMajors();
    };

    // @ts-ignore
    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: "" });
    }
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick() {
    // @ts-ignore
    const token = gapi.client.getToken();
    if (token !== null) {
      // @ts-ignore
      google.accounts.oauth2.revoke(token.access_token);
      // @ts-ignore
      gapi.client.setToken("");
      document.getElementById("content").innerText = "";
      document.getElementById("authorize_button").innerText = "Authorize";
      document.getElementById("signout_button").style.visibility = "hidden";
    }
  }

  /**
   * Print the names and majors of students in a sample spreadsheet:
   * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   */
  async function listMajors() {
    let response;
    try {
      // Fetch first 10 files
      // @ts-ignore
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: "17wp3lYkDicBt_EhzsHwbfMgGRY_0VkJiHbqfM-kyirU",

        range: "Sheet1!A1:B200",
      });
    } catch (err) {
      document.getElementById("content").innerText = err.message;
      return;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
      document.getElementById("content").innerText = "No values found.";
      return;
    }
    // Flatten to string to display
    const output = range.values.reduce(
      (str, row) => `${str}${row[0]}, ${row[1]}\n`,
      "\n"
    );
    document.getElementById("content").innerText = output;
  }
</script>

<div>
  <p>Sheets API Quickstart</p>

  <!--Add buttons to initiate auth sequence and sign out-->
  <button id="authorize_button" on:click={handleAuthClick}>Authorize</button>
  <button id="signout_button" on:click={handleSignoutClick}>Sign Out</button>

  <pre id="content" style="white-space: pre-wrap;" />

  <script
    async
    defer
    src="https://apis.google.com/js/api.js"
    on:load={gapiLoaded}></script>
  <script
    async
    defer
    src="https://accounts.google.com/gsi/client"
    on:load={gisLoaded}></script>
</div>
