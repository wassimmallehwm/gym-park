export class Config {

    static host = "localhost"
    static port = "3030"

    static prod = {
        apiUrl: "/api/",
        publicUrl: "/public/",
        socketUrl: "/"
    };

    static dev = {
        apiUrl: `http://${this.host}:${this.port}/api/`,
        publicUrl: `http://${this.host}:${this.port}/public/`,
        socketUrl: `ws://${this.host}:${this.port}`,
        // apiUrl: "http://192.168.1.19:3030/api/",
        // publicUrl: "http://192.168.1.19:3030/public/"
    };

    public static getConfig(){
        return process.env.NODE_ENV === 'development' ? this.dev : this.prod
    }
}
