export class PlayerController {
  constructor ({ PlayerModel }) {
    this.playerModel = PlayerModel
  }

  addPlayer = async (req, res) => {
    const userId = req.user.id
    const player = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      position: req.body.position,
      year: req.body.year,
      team: req.body.team,
      avatar:
        req.body.avatar != null
          ? req.body.avatar
          : 'assets/images/person_icon.png',
      userId,
      guest: req.body.guest
    }
    try {
      const playerSaved = await this.playerModel.savePlayer({ player })
      return res.status(200).send({
        player: playerSaved
      })
    } catch (err) {
      return res.status(500).send({
        message: `Error al crear el jugador: ${err}`
      })
    }
  }

  getPlayersByTeamId = async (req, res) => {
    const userId = req.user.id
    console.log(userId)
    const teamId = req.params.teamId
    try {
      const players = await this.playerModel.findByTeam({ teamId, userId })
      return res.status(200).send({
        players
      })
    } catch (error) {
      return res.status(500).send({
        message: `Error al obtener players: ${error}`
      })
    }
  }

  updatePlayer = async (req, res) => {
    const player = req.body
    const userId = req.user.id
    const id = req.params.id
    try {
      const playerUpdated = await this.playerModel.updatePlayer({ id, player, userId })
      res.status(200).send({ player: playerUpdated })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: `Error al editar player: ${err}` })
    }
  }

  deletePlayer = async (req, res) => {
    const id = req.params.id
    const userId = req.user.id
    try {
      await this.playerModel.deletePlayer({ id, userId })
      res.status(200).send({ player: id })
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Error al borrar el jugador' })
    }
  }
}
