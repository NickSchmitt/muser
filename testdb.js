const input = [
	["add", "Hello"],
	["add", ", how"],
	["add", "is it"],
	["add", "going today?"]
]

ans = []

for (let i of input) {

	let last = ans.slice(-1)

	if (i[0] == "add") {
		ans.push(last + i[1])
	}
}

console.log(ans)
