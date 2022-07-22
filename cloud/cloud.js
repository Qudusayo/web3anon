const logger = Moralis.Cloud.getLogger();

Moralis.Cloud.beforeSave("xlmn", async (request) => {
  try {
    const owner = request.object.get("owner");
    const ownerUsername = request.object.get("username");
    logger.info(`${ownerUsername} owned by ${owner}`);

    if (owner && ownerUsername) {
      const User = Moralis.Object.extend("_User");
      const query = new Moralis.Query(User);
      query.equalTo("ethAddress", owner.toLowerCase());
      const user = await query.first({ useMasterKey: true });
      logger.info("USER DATA");
      logger.info(JSON.stringify(user));
      user.set("xlmnUsername", ownerUsername);
      await user.save(null, { useMasterKey: true });
    }
  } catch (error) {
    logger.info(error);
  }
});

Moralis.Cloud.define("message", async (request) => {
  try {
    const username = request.params.username;

    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    query.equalTo("xlmnUsername", username.toLowerCase());
    const user = await query.first({ useMasterKey: true });

    const Messages = Moralis.Object.extend("Messages");
    const message = new Messages();

    message.set("message", request.params.message);

    await message.save();

    const relation = user.relation("messages");
    relation.add(message);
    user.save(null, { useMasterKey: true });

    const messageACL = new Moralis.ACL();
    messageACL.setWriteAccess(user, true);
    messageACL.setReadAccess(user, true);
    message.setACL(messageACL);
    await message.save(null, { useMasterKey: true });

    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false, error };
  }
});
