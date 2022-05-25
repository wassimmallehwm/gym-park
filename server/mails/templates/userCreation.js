module.exports = (firstname, lastname, email, password) => {
    return "<div style='padding: 3rem; height: 90%;width: 90%;background-color: rgb(243, 243, 243); text-align: center;'>" +
        "<div style='height: 200px; align-items: center;'>" +
        "<img style='width: 200px;' src='" + process.env.PUBLIC_URL + "logo.png' />" +
        "</div>" +
        "<h2 style='color:black'> Hello Mr " + firstname + " " + lastname + "</h2><br>" +
        "<h2 style='color:black'> Welcome to Gym Park</h2><br>" +
        "<p style='font-size: 16px; color:black'> Your account has been created with these credentials : </p>" +
        "<p style='font-size: 16px; color:black'><strong>Email : </strong>" + email + "</p>" +
        "<p style='font-size: 16px; color:black'><strong>Password : </strong>" + password + "</p>" +
        "<div style='height: 50px;background-color: #084259;width: 250px;font-size: 20px;text-align: center;margin: auto;border-radius: 5px;'>" +
        "<a style='background-color: #084259;text-decoration: none;color: white;height: 100%;line-height: 45px;'" +
        " target='_blank' href='" + process.env.CLIENT_URL + "login/'>Login to your account</a></div></div>";
}