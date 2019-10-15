function copy_array(arr) {
    var res = [];
    for (let i = 0; i < arr.length; ++i) {
        const element = arr[i];
        // res.push(new Block(element.id, element.time));
        res.push(element);
    }
    return res;
}

function array_random(n, from, to) {
    if ( ! n) n = 10;
    if ( ! from) from = 0;
    if ( ! to) to = 99;
    var res = []; 
    while (n != 0) {
        var rand = Math.floor(Math.random() * to) + from; 
        res.push(rand); 
        --n;
    } return res; 
}

function equal_array(a, b) {
    if (a.length != b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] != b[i]) return false;
    }
    return true;
}


function min_max(a, b) {
    if (b < a) return [b, a];
    return [a, b];
}

function generate_code(name, sn) {
    var res = '';
    for (let i = 0; i < sn.length; ++i) {
        const e = min_max(sn[i][0], sn[i][1]);
        
        res +=            
`    if (data[${e[1]}] < data[${e[0]}]) {
        [data[${e[0]}], data[${e[1]}]] = [data[${e[1]}], data[${e[0]}]];
    }\n\n`
    }

    return `function ${name}(data) {
${res}
    return data;
}`
}

function compareNumbers(a, b) {
    return a - b;
}

function test_algoritm(n, name, code) {
    var reps = n * n;

    code += `\ndata = ${name}(data);console.log(data);`;
    console.log(code);

    for (let i = 0; i < reps; i++) {
        var data = array_random(n);
        // var data = [11, 94, 9];
        var sorted_data = copy_array(data);
        sorted_data = sorted_data.sort(compareNumbers);
    
        // console.log("test_algoritm ", data);
    
        eval(code);
    
        var res = equal_array(sorted_data, data);
        if (!res) {
            console.log("test_algoritm ", data, sorted_data, res);
            return false;
        }
        // return res;
    }
    return true;
}

function test_nets(nets) {
    for (let i = 0; i < nets.length; i++) {
        const e = nets[i];
        
        var code = generate_code(`sort${e.n}`, e.sn);
        // console.log(code);

        var res = test_algoritm(e.n, `sort${e.n}`, code);
    }
}

function main() {
    var nets = [
        {   n: 3,
            sn: [[1, 2], [0, 1], [1, 2]]},
        {   n: 4,
            sn: [[0, 1], [2, 3], [1, 3], [0, 2], [1, 2]]},
        {   n: 5,
            sn: [[1, 2], [3, 4], [1, 3], [0, 2], [2, 4], [0, 3], [0, 1], [2, 3], [1, 2]]},
        {   n: 6,
            sn: [[0, 1], [2, 3], [4, 5], [0, 2], [3, 5], [1, 4], [0, 1], [2, 3], [4, 5],
                 [1, 2], [3, 4], [2, 3]]},
        {   n: 7,
            sn: [[1, 2], [3, 4], [5, 6], [0, 2], [4, 6], [3, 5], [2, 6], [1, 5], [0, 4],
                 [2, 5], [0, 3], [2, 4], [1, 3], [0, 1], [2, 3], [4, 5]]},
        {   n: 8,
            sn: [[0, 7], [1, 6], [2, 5], [3, 4], [0, 3], [4, 7], [1, 2],
                 [5, 6], [0, 1], [2, 3], [4, 5], [6, 7], [3, 5], [2, 4],
                 [1, 2], [3, 4], [5, 6], [2, 3], [4, 5]]},
        {   n: 9,
            sn: [[1, 8], [2, 7], [3, 6], [4, 5], [1, 4], [5, 8], [0, 2],
                 [6, 7], [2, 6], [7, 8], [0, 3], [4, 5], [0, 1], [3, 5],
                 [6, 7], [2, 4], [1, 3], [5, 7], [4, 6], [1, 2], [3, 4],
                 [5, 6], [7, 8], [2, 3], [4, 5]]},
        
        // 10 v1 (31 comps)
        {
            n: 10,
            sn: [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [4, 9], [0, 5],
                 [1, 8], [3, 7], [2, 6], [0, 2], [3, 6], [7, 9], [1, 4],
                 [5, 8], [0, 1], [2, 7], [8, 9], [4, 6], [3, 5], [2, 4],
                 [6, 8], [1, 3], [5, 7], [1, 2], [3, 4], [5, 6], [7, 8],
                 [2, 3], [4, 5], [6, 7]]},

        // 10 v2 (29 comps)
        {   n: 10,
            sn: [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [3, 5], [7, 9],
                 [2, 4], [6, 8], [1, 9], [0, 2], [3, 8], [1, 4], [5, 9],
                 [2, 7], [0, 6], [2, 3], [4, 8], [5, 7], [1, 6], [1, 2],
                 [3, 6], [7, 8], [4, 5], [2, 3], [5, 7], [4, 6], [3, 4],
                 [5, 6]]},

        {  n: 11,
           sn: [[0, 9], [1, 8], [2, 7], [3, 6], [4, 5], [0, 3], [4, 10],
                [1, 2], [6, 9], [7, 8], [0, 1], [2, 3], [5, 8], [9, 10],
                [6, 7], [1, 2], [4, 6], [8, 10], [5, 9], [0, 4], [7, 8],
                [1, 5], [2, 9], [3, 6], [1, 4], [5, 7], [2, 3], [6, 9],
                [2, 4], [6, 7], [8, 9], [3, 5], [3, 4], [5, 6], [7, 8]]},
        
        
        // {   n: 12,
        //     sn: [[0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [], [],
        //          [], [], [], [], [], [], [],
        //          [], [], [], [], [], [], [],
        //          [], [], [], [], [], [], [],
        //          [], [], [], [], [], [], []]},
        

        ];
    test_nets(nets);

    // var sn3 = [[1, 2], [0, 1], [1, 2]];
    // var code = generate_code("sort3", sn3);
    // console.log(code);
}

main();