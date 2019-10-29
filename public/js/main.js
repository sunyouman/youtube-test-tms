function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
        .then(function () { console.log("Sign-in successful");
            gapi.client.load('youtube', 'v3'); },
            function (err) { console.error("Error signing in", err); });
}

$(document).ready(function() {
    gapi.load("client:auth2", function () {
        gapi.auth2.init({ client_id: '395791105223-1ivgkhjch4sfgfc78sp081pturvg2muo.apps.googleusercontent.com' });
        authenticate();
    });

    $('#search').click(function() {
        var q = $('#query').val();
        $('#query').val('');
        queryYoutube(q);
    });
});

function queryYoutube(q) {
    var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet'
    });

    request.execute(function (response) {
        var str = JSON.stringify(response.result, null, 2);
        $('#json').text(str);
    });
}