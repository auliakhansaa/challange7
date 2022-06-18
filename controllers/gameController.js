const {History , Room} = require("../models");
const wait = {};

const data = {}; // Ini ceritanya model disimpen ke database
const cek = {}; 

function waitEnemyResponse(id) {
  return new Promise((resolve) => {
    wait[id] = { resolve };
  });
}

module.exports = {
  createRoom: async (req, res) => {
    try {
      const { roomName } = req.body;
      const room = await Room.create({
        roomName,
      });
      res.json(room);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  },

  playGame: async (req, res) => {
    const id = req.params.id;

    const roomExist = await Room.findAll({ where: { id: id } });


    if (roomExist) {
    if (!data[id]) {
      // Player 1 memilih
      data[id] = {
        player1: req.body.choose,
        id1: req.body.id,
        player2: null,
        id2:null,
      };
    } else {
      // Player 2 memilih
      data[id].player2 = req.body.choose;
      data[id].id2= req.body.id;

      if(data[id].player1 == "batu"){
        if(data[id].player2 == "batu"){
          data[id].Hasil = "Draw";

          cek[id] = {
            roomId: id,
            idWin: "0",
            idLose: "0",
          };
          const h = await History.gameHistory(cek[id]);

        }
        else if(data[id].player2 == "kertas"){
          data[id].Player1 = "Kalah";

          cek[id] = {
            roomId: id,
            idWin: data[id].id2,
            idLose: data[id].id1,
          };
          const h = await History.gameHistory(cek[id]);

        }
        else if (data[id].player2 == "gunting"){
          data[id].Player1 = "Menang";
          cek[id] = {
            roomId: id,
            idWin: data[id].id1,
            idLose: data[id].id2,
          };
          const h = await History.gameHistory(cek[id]);
        }

      }
      else if(data[id].player1 == "kertas"){
        if(data[id].player2 == "batu"){
          data[id].Player1 = "Menang";
          cek[id] = {
            roomId: id,
            idWin: data[id].id1,
            idLose: data[id].id2,
          };
          const h = await History.gameHistory(cek[id]);
          
        }
        else if(data[id].player2 == "kertas"){
          data[id].Hasil = "Draw";
          cek[id] = {
            roomId: id,
            idWin: "0",
            idLose: "0",
          };
          const h = await History.gameHistory(cek[id]);
        }
        else if (data[id].player2 == "gunting"){
          data[id].Player1 = "Kalah";
          cek[id] = {
            roomId: id,
            idWin: data[id].id2,
            idLose: data[id].id1,
          };
          const h = await History.gameHistory(cek[id]);
        }
      }
      else if(data[id].player1 == "gunting"){
        if(data[id].player2 == "kertas"){
          data[id].Player1 = "Menang";
          cek[id] = {
            roomId: id,
            idWin: data[id].id1,
            idLose: data[id].id2,
          };
          const h = await History.gameHistory(cek[id]);
        }
        else if(data[id].player2 == "gunting"){
          data[id].Hasil = "Draw";
          cek[id] = {
            roomId: id,
            idWin: "0",
            idLose: "0",
          };
          const h = await History.gameHistory(cek[id]);
        }
        else if (data[id].player2 == "batu"){
          data[id].Player1 = "Kalah";
          cek[id] = {
            roomId: id,
            idWin: data[id].id2,
            idLose: data[id].id1,
          };
          const h = await History.gameHistory(cek[id]);
        }
      }
    }
  }else{
    res.status(400).json({ msg: err.message });
  }

  if (!wait[id]) {
    // Player 1 menunggu respons player 2
    await waitEnemyResponse(id);
  } else {
    // Player 2 merespons ke player 1 untuk selesai menunggu
    wait[id].resolve();
    delete wait[id];
  }
    res.json(data[id]);
  },
};
