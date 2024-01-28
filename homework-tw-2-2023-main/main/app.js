/**
 * the function renders an object to a tagged string and performs token substitution
 * @param {object} input - a javascript object representing a hierachycal structure  
 * @param {object} values - a list of key value pairs where the key is a token to be replaced with the value in strings present in input
 */
function render(input, values) {
    if (typeof (input) == 'object' && typeof (values) == 'object') {
        if (Object.keys(input).length == 0) {
            return '';
        }

        function putToken(stringValue) {
            if (stringValue.indexOf('${') != -1) {
                token = stringValue.slice(stringValue.indexOf('${') + 2, stringValue.indexOf('}'));
                stringValue = stringValue.slice(0, stringValue.indexOf('${'));
                stringValue = stringValue.concat(values[token]);
            }
            return stringValue;
        }

        function processHTML(object) {
            let result = '';
            for (const [k, v] of Object.entries(object)) {
                if (typeof (v) == 'string') {
                    stringValue = v;
                    result += `<${k}>${putToken(v)}</${k}>`;
                } else if (typeof (v) == 'object' && v !== null) {
                    result += `<${k}>${processHTML(v)}</${k}>`;
                }
            }
            return result;
        }
        return processHTML(input);
    } else {
        throw new Error('InvalidType');
    }
}

module.exports = {
    render
}