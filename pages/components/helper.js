function ReformatArrayPost({ data }) {
    var output = []
    data.forEach(element => {
        output.push(ReformatOne(element))
    });
    return output
}

function ReformatOne(element) {
    //console.log(element)

    if (element instanceof Array) {
        //console.log("array")
        var line = []

        Array.prototype.forEach.call(element, el => {
            line.push(ReformatOne(el))
        });

    } else {
        if (element == null) {
            return null
        }
        var line = {'id': element.id}
        for (let key in element.attributes) {
            if (element.attributes[key] instanceof Object) {
                //console.log("object: " + key)
                line[key] = ReformatOne(element.attributes[key].data)
            } else {
                //console.log("nope: " + key)
                line[key] = element.attributes[key]
            }
        };
    }
    return line
}

export default ReformatArrayPost