String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function get_level_str(l, levels) {
	var x = levels[l];
	if (x == undefined) {
		x = Object.keys(levels).length
		levels[l] = x;
		return String.raw`(?<l${x}>[0-9]+)`;
	} else {
		return String.raw`\k<l${x}>`;
	}
}

function get_number_str(n, nums) {
	var x = nums[n];
	if (x == undefined) {
		x = Object.keys(nums).length
		nums[n] = x;
		return String.raw`(?<n${x}>[0-9]+)`;
	} else {
		return String.raw`\k<n${x}>`;
	}
}

function replaces(str, pattern) {
	var levels = {};
	var numbers = {};
	
    var m;
    do {
        var re = new RegExp(pattern, "g");
        m = re.exec(str);
        if (m) {
			var complete = m[0];
			var l = m[1];
			var n0 = m[3];
			var n1 = m[4];
			var n2 = m[5];
			
			var l_str = get_level_str(l, levels);
			
			if (!n2) {
				var n0_str = get_number_str(n0, numbers);
				var n1_str = get_number_str(n1, numbers);
				var tmp = String.raw`\[${l_str}\,\[${n0_str}\,${n1_str}\]\]`
			} else {
				var n2_str = get_number_str(n2, numbers);
				var tmp = String.raw`\[${l_str}\,${n2_str}\]`
			}

            str = str.replace(complete, tmp)
        }
    } while (m);

    return str;
}


// var raw_pattern = "[3,[2,5]],[4,[2,3]],[5,[3,5]],[6,3],[6,5],[5,[2,4]],[6,2],[6,4],[4,[3,5]],[5,[4,5]],[6,4],[6,5],[5,[2,3]],[6,2],[6,3]";
// var raw_pattern = "[3,[4,5]],[4,[1,4]],[5,[2,4]],[6,2],[6,4],[5,[1,5]],[6,1],[6,5],[4,[1,5]],[5,[2,5]],[6,2],[6,5],[5,[1,4]],[6,1],[6,4]";
// var raw_pattern = "[3,[3,5]],[4,[1,5]],[5,[1,3]],[6,3],[6,1],[5,[2,5]],[6,5],[6,2],[4,[1,3]],[5,[1,5]],[6,5],[6,1],[5,[2,3]],[6,3],[6,2]";
// var raw_pattern = "[3,[2,5]],[4,[4,5]],[5,[2,4]],[6,4],[6,2],[5,[3,5]],[6,5],[6,3],[4,[2,4]],[5,[2,3]],[6,3],[6,2],[5,[4,5]],[6,5],[6,4]";

// var raw_pattern = "[5,[4,5]],[6,5],[6,4]";
// var raw_pattern = "[9,[3,7]],[10,3],[10,7]";

// var raw_pattern = "[8,[4,5]],[9,4],[],[],[9,5],[],[]";
var raw_pattern = "[8,[4,5]],[9,5],[],[],[9,4],[],[]";


var pattern = raw_pattern.replaceAll("[", '\\[');
    pattern = pattern.replaceAll("]", '\\]');
    pattern = pattern.replaceAll(",", '\\,');
// console.log(pattern)


var internal_pattern = String.raw`\\\[(?<l>[0-9]+)\\\,(\\\[(?<n0>[0-9]+)\\\,(?<n1>[0-9]+)\\\]|(?<n2>[0-9]+))\\\]`;

var xxx = replaces(pattern, internal_pattern);
console.log(xxx);

// \\\[3\\\,\\\[2\\\,5\\\]\\\]
// \\\[(?<l>[0-9]+)\\\,\\\[(?<n0>[0-9]+)\\\,(?<n1>[0-9]+)\\\]\\\]
	// \\\[(?<l>[0-9]+)\\\,(?<n0>[0-9]+)\\\]	


