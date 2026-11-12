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
// var raw_pattern = "[8,[4,5]],[9,5],[],[],[9,4],[],[]";
// var raw_pattern = "[8,[3,6]],[9,[3,7]],[10,3],[10,7],[9,[6,7]],[10,6],[10,7]"
// var raw_pattern = "[8,[3,7]],[9,[4,7]],[10,4],[10,7],[9,[3,5]],[10,3],[10,5]"
// var raw_pattern = "[8,[3,5]],[9,[2,3]],[10,3],[10,2],[9,5],[],[]"
// var raw_pattern = "[8,[5,7]],[9,[1,7]],[10,7],[10,1],[9,[1,5]],[10,5],[10,1]"
// var raw_pattern = "[8,[2,7]],[9,[6,7]],[10,6],[10,7],[9,2],[],[]"
// var raw_pattern = "[8,[3,6]],[9,[6,7]],[10,6],[10,7],[9,[2,3]],[10,2],[10,3]"
// var raw_pattern = "[8,[2,7]],[9,2],[],[],[9,[1,7]],[10,7],[10,1]"
// var raw_pattern = "[8,[3,6]],[9,[2,3]],[10,3],[10,2],[9,[6,7]],[10,7],[10,6]"
// var raw_pattern = "[8,[1,6]],[9,[6,7]],[10,7],[10,6],[9,[1,7]],[10,7],[10,1]"

// pattern_select_1_3_ab__4
// var raw_pattern = "[7,[1,3]],[8,[1,5]],[9,5],[],[],[9,1],[],[],[8,3],[],[],[],[],[],[]"

// var raw_pattern = "[8,[1,4]],[9,4],[],[],[9,[1,6]],[10,1],[10,6]"
// var raw_pattern = "[8,[1,4]],[9,[1,5]],[10,5],[10,1],[9,4],[],[]"

// pattern_select_1_3_ab__7
// var raw_pattern = "[7,[5,7]],[8,5],[],[],[],[],[],[],[8,[3,7]],[9,7],[],[],[9,3],[],[]"

// pattern_select_1_3_ab__8
// var raw_pattern = "[7,[1,5]],[8,5],[],[],[],[],[],[],[8,[1,6]],[9,1],[],[],[9,6],[],[]"

//pattern_select_1_3_ab__9
var raw_pattern = "[7,[2,7]],[8,[1,7]],[9,1],[],[],[9,7],[],[],[8,2],[],[],[],[],[],[]"

// var raw_pattern = "[8,[4,5]],[9,[1,4]],[10,1],[10,4],[9,[1,5]],[10,1],[10,5]"
// var raw_pattern = "[8,[3,5]],[9,5],[],[],[9,[2,3]],[10,2],[10,3]"

// pattern_select_1_5_ab_cd_ce__1
// var raw_pattern = "[7,[3,5]],[8,[4,5]],[9,4],[],[],[9,5],[],[],[8,[3,6]],[9,[3,7]],[10,3],[10,7],[9,[6,7]],[10,6],[10,7]"

// pattern_select_2_5_ab_ac_db_ec__1
// var raw_pattern = "[7,[2,7]],[8,[3,7]],[9,[4,7]],[10,4],[10,7],[9,[3,5]],[10,3],[10,5],[8,[3,5]],[9,[2,3]],[10,3],[10,2],[9,5],[],[]"


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


