const AppConfig = require('../modules/app-config/app-config.model');
const Role = require('../modules/role/role.model');
const User = require('../modules/user/user.model');
const bcrypt = require('bcryptjs');

const createAppConfig = async () => {
    const appconfig = new AppConfig();
    appconfig.name = 'Gym Park';
    appconfig.version = '1.0.0';
    appconfig.social_name = 'Gym Park';
    await appconfig.save();
}

const createAdmin = async (role) => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash("password", salt);
    const user = new User();
    user.email = "admin@admin.com";
    user.password = hashedPassword;
    user.enabled = true;
    user.firstname = "Admin";
    user.lastname = "Admin";
    user.sex = "MALE";
    user.phone = "12345678";
    user.birthdate = new Date("1996-07-21");
    user.roles = [role._id];
    await user.save();
}


const createCollections = async () => {
    const admin = new Role({label: 'ADMIN'});
    const coach = new Role({label: 'COACH'});
    const user = new Role({label: 'USER'});

    const adminRole = await admin.save();
    await coach.save();
    await user.save();

    await createAdmin(adminRole);
}


const changeAppVersion = async (oldVersion, version) => {
    const appData = await AppConfig.findOne({version: oldVersion})
    appData.version = version;
    appData.save();
}


const migration = async (data) => {
}

const dbSeeder = async () => {
    AppConfig.find().then(
        async res => {
            if (res && res.length > 0) {
                console.log('App already initialized !')
                return;
            } else {
                console.log('Initializing App ...')
                await createAppConfig();
                await createCollections();
                console.log('Initializing initialized successfully !')
            }
        },
        error => {
            console.log(error);
        }
    )
}


module.exports = dbSeeder;