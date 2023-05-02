import fs from 'fs';


class File {
    constructor(path = './files', data = '') {
        this.path = path;
        this.data = data;

        this.write_file = function() {
            fs.writeFile(this.path, this.data, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }


    }
}
