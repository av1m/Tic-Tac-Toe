window.onload = start;

function start() {
  var isTurnX = true;
  var tilesX = new Array(9).fill(false);
  var tilesO = new Array(9).fill(false);
  var tiles = new Array(9).fill(false);

  for (var i = 0; i < 9; i++) setTile(i);

  function setStatus(toSet) {
    document.getElementById("status").innerHTML = toSet;
  }

  function setWon(tiles) {
    for (var i = 0; i < 3; i++)
      document.getElementById(tiles[i]).classList.add("won");
  }

  function setTile(id) {
    var tile = document.getElementById(id);
    tile.isWrite = true;
    tile.onclick = () => {
      tileClick(id, tile);
      if (!checkWon(tilesX, "X") && !checkWon(tilesO, "O")) checkTie();
    };
  }

  function stopGame() {
    for (var i = 0; i < 9; i++) document.getElementById(i).isWrite = false;
    document.getElementById("replay").classList.remove("hidden");
  }

  function checkTie() {
    var tilesSet = new Set(tiles);
    if (tilesSet.has(true) && !tilesSet.has(false)) {
      setStatus("Cat's game!");
      stopGame();
    }
  }

  function checkWon(tiles, tile) {
    function check(pos1, pos2, pos3, tile) {
      if (
        tiles[pos1] === true &&
        tiles[pos2] === true &&
        tiles[pos3] === true
      ) {
        stopGame();
        setWon([pos1, pos2, pos3]);
        setStatus(tile + " has won! 🎉");
        return true;
      }
    }
    var checkPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    checkPositions.forEach((pos) => {
      if (check(pos[0], pos[1], pos[2], tile)) return true;
    });
    return false;
  }

  function tileClick(tileId, tile) {
    if (isTurnX && tile.isWrite) {
      tile.innerHTML = "x";
      isTurnX = false;
      tile.isWrite = false;
      tilesX[tileId] = true;
      tilesO[tileId] = false;
      tiles[tileId] = true;
      setStatus("O's turn");
    } else if (tile.isWrite) {
      tile.innerHTML = "o";
      isTurnX = true;
      tile.isWrite = false;
      tilesX[tileId] = false;
      tilesO[tileId] = true;
      tiles[tileId] = true;
      setStatus("X's turn");
    }
  }
}
