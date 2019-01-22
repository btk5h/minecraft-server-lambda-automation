import AWS from "aws-sdk"

import RconClient from "modern-rcon"
import pinger from "minecraft-pinger"
import delay from "delay"

const ec2 = new AWS.EC2({
  apiVersion: "2016-11-15"
})

export default async () => {
  const serverInfo = await pinger.pingPromise(process.env.SERVER_HOST, process.env.SERVER_PORT)

  if (serverInfo.players.online === 0) {
    const rcon = new RconClient(process.env.SERVER_HOST, Number(process.env.RCON_PORT), process.env.RCON_PASSWORD)

    await rcon.connect()
    await sendCommand(rcon, "save-all")
    await sendCommand(rcon, "stop")
    await rcon.disconnect()

    await delay(5000)

    await ec2.stopInstances({
      InstanceIds: [process.env.INSTANCE_ID]
    }).promise()
  }
}

async function sendCommand(rcon, command) {
  const response = await rcon.send(command)
  console.log(response)
}