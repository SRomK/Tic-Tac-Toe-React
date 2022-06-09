import React, { useState, useEffect } from "react";
import "../../styles/home.css";

//create your first component
const Home = () => {
	const [table, setTable] = useState([
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
		[undefined, undefined, undefined],
	]);
	const [turn, setTurn] = useState("x");

	const [isWinner, setIsWinner] = useState(false);
	const [recarga, setRecarga] = useState("Tic Tac Toe");

	const CheckColumn = () => {
		let j = 0;
		let ctrl = true;

		while (ctrl && j < table.length) {
			let i = 1;
			let ctrl2 = true;
			while (ctrl2 && i < table[j].length) {
				if (
					table[i][j] != table[i - 1][j] ||
					typeof table[i][j] == "undefined"
				) {
					ctrl2 = false;
				} else {
					i += 1;
				}
			}
			ctrl = !ctrl2;
			j += 1;
		}

		return !ctrl;
	};

	const CheckMayorDiagonal = () => {
		let i = 1;
		let j = 1;
		let ctrl = true;

		while (ctrl && i < table.length && j < table.length) {
			if (
				table[i][j] != table[i - 1][j - 1] ||
				typeof table[i][j] === "undefined"
			) {
				ctrl = false;
			} else {
				i += 1;
				j += 1;
			}
		}
		return ctrl;
	};
	const CheckSecondDiagonal = () => {
		let i = 1;
		let j = 1;
		let ctrl = true;

		while (ctrl && i < table.length && j < table.length) {
			if (
				table[i][j] != table[i - 1][j + 1] ||
				typeof table[i][j] === "undefined"
			) {
				ctrl = false;
			} else {
				i += 1;
				j -= 1;
			}
		}
		return ctrl;
	};
	const CheckRows = () => {
		let i = 0;
		let ctrl = true;

		while (ctrl && i < table.length) {
			let j = 1;
			let ctrl2 = true;
			while (ctrl2 && j < table[i].length) {
				if (
					table[i][j] != table[i][j - 1] ||
					typeof table[i][j] == "undefined"
				) {
					ctrl2 = false;
				} else {
					j += 1;
				}
			}
			ctrl = !ctrl2;
			i += 1;
		}

		return !ctrl;
	};

	const ChangeTurn = () => setTurn(turn === "x" ? "o" : "x");

	useEffect(() => {
		ChangeTurn();
		CheckWinner();
	}, [table]);

	const SetValue = (i, j) => {
		if (!isWinner) {
			if (typeof table[i][j] === "undefined") {
				const tmp = table;
				tmp[i][j] = turn;
				setTable([...table]);
			} else {
				alert("Posición ya ocupada");
			}
		} else {
			setIsWinner(true);
			location.reload();
		}
	};

	const CheckWinner = () => {
		if (
			CheckRows() ||
			CheckMayorDiagonal() ||
			CheckColumn() ||
			CheckSecondDiagonal()
		) {
			alert("Hay un ganador");
			setIsWinner(true);
			setRecarga("Click para volver a empezar");
		}
	};

	return (
		<>
			{" "}
			<div className="container">
				<h1 className="winner">{recarga}</h1>
				<table>
					<tbody>
						{table.map((row, i) => (
							<tr key={i}>
								{row.map((column, j) => (
									<td onClick={() => SetValue(i, j)} key={j}>
										<div className="item">{column}</div>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Home;
