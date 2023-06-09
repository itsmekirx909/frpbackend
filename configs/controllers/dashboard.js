const axios = require('axios')
const guildModel = require('../schemas/guildid')
const giveawayPingModel = require('../schemas/giveawayping')
const suggestionChannelModel = require('../schemas/suggestionchannel')
const confessionChannelModel = require('../schemas/confessionchannel')
const confessionReplyChannelModel = require('../schemas/confessionreplychannel')
const nsfwChannelModel = require('../schemas/nsfwchannels')
const reactionRolesModel = require('../schemas/reactionrolesschema')
const delmsgslogModel = require('../schemas/delmsgslogs')
const warningslogModel = require('../schemas/warningslogs')
const ticketslogModel = require('../schemas/ticketlogs')
const kmbulogModel = require('../schemas/kmbulogs')
const rulesModel = require('../schemas/rules')
const automodModel = require('../schemas/automod')
const ticketCategoriesModel = require('../schemas/ticketcategories')
const profileChannelsModel = require('../schemas/profilechannels')
const unverifiedModel = require('../schemas/unverified')
const serverProfilesModel = require('../schemas/serverprofilesdata')
const matchModel = require('../schemas/matchdata')
const requiredMatchModel = require('../schemas/matchrequirement')
const applicationsChannelModel = require('../schemas/applicationchannel')
const verificationChannelModel = require('../schemas/verificationchannel')
const datingModel = require('../schemas/datingsim')
const matchInfoModel = require('../schemas/matchinfo')
const genderModel = require('../schemas/genderroles')
const ageModel = require('../schemas/ageroles')
const verifiedModel = require('../schemas/verifiedroles')
const cmModel = require('../schemas/confesslogs')
const membersModel = require('../schemas/members')
const otherLogsModel = require('../schemas/otherlogs')
const muteRoleModel = require('../schemas/muterole')
require('dotenv').config()

const dashboard = {

  userData: async (req, res) => {
    const { data } = req.body
    const accessToken = data.accessToken
    const tokenType = data.tokenType

    if (!accessToken) {
      return res.status(400).send({ message: 'Missing code parameter.' });
    }


    try {


      const userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${tokenType} ${accessToken}`
        }
      });

      const userData = userResponse.data;

      const guildsResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: {
          authorization: `${tokenType} ${accessToken}`
        }
      });

      const guilds = guildsResponse.data;

      const botGuildsResponse = await axios.get('https://discord.com/api/users/@me/guilds', {
        headers: {
          authorization: `Bot ${process.env.TOKEN}`
        }
      });

      const botGuilds = botGuildsResponse.data

      const commonGuilds = guilds.filter(g => botGuilds.find(bg => (bg.id == g.id) && (g.permissions & 0x08) === 0x08));



      res.status(200).json({
        access_token: accessToken,
        token_type: tokenType,
        user_id: userData,
        guilds: commonGuilds
      });


    } catch (err) {
      console.error(err.message);
      res.status(500).send({ message: 'An error occurred while fetching data.' });
    }
  },

  guildsData: async (req, res) => {
    const { data } = req.body
    const { guild } = data

    if (!guild) {
      return res.status(400).send({ message: 'Missing access token parameter.' });
    }

    try {

      const responseRoles = await axios.get(`https://discord.com/api/guilds/${guild.id}/roles`, {
        headers: {
          Authorization: `Bot ${process.env.TOKEN}`
        }
      });

      const guildRoles = responseRoles.data;

      const responseChannels = await axios.get(`https://discord.com/api/guilds/${guild.id}/channels`, {
        headers: {
          Authorization: `Bot ${process.env.TOKEN}`
        }
      });

      const guildChannels = responseChannels.data;


      res.json({
        channels: guildChannels,
        roles: guildRoles
      })


    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'An error occurred while fetching data.' });
    }

  },

  reactRolesData: async (req, res) => {
    const { guild } = req.body


    if (!guild) {
      return res.status(400).send({ message: 'Missing access token parameter.' });
    }

    try {


      //reaction roles
      const selfRolesScehma = await reactionRolesModel.findOne({ guild })

      let reactRoles
      if (selfRolesScehma) {
        const roles = selfRolesScehma.data
        reactRoles = roles
      } else {
        const obj = {
          guild,
          data: []
        }
        const selfRolesScehma3 = await reactionRolesModel.create(obj)

        reactRoles = []

      }


      //rules
      const rulesSchema = await rulesModel.findOne({ guild })

      let rules
      if (rulesSchema) {
        const rulesGet = rulesSchema.rules
        rules = rulesGet
      } else {
        const obj = {
          guild,
          rules: []
        }
        const rulesSchema3 = await rulesModel.create(obj)

        rules = []

      }


      //ticket categories

      const ticketCategoriesSchema = await ticketCategoriesModel.findOne({ guild })

      let categories
      if (ticketCategoriesSchema) {
        const categoriesGet = ticketCategoriesSchema.categories
        categories = categoriesGet
      } else {
        const obj = {
          guild,
          categories: []
        }
        const ticketCategoriesSchema3 = await ticketCategoriesModel.create(obj)

        categories = []

      }

      //automod
      const automodSchema = await automodModel.findOne({ guild })

      let automod
      if (automodSchema) {
        const automodGet = automodSchema.automod
        automod = automodGet
      } else {
        const obj = {
          guild,
          automod: false
        }
        const automodSchema3 = await automodModel.create(obj)

        automod = false

      }


      //required roles for making profiles
      const requiredSchema = await serverProfilesModel.findOne({ guild })

      let requiredRoles
      if (requiredSchema) {
        const requiredRolesGet = requiredSchema.required_roles
        requiredRoles = requiredRolesGet
      } else {
        const obj = {
          guild,
          required_roles: []
        }
        const requiredSchema3 = await serverProfilesModel.create(obj)

        requiredRoles = []

      }


      //matching roles
      const matchSchema = await matchModel.findOne({ guild })

      let matchRoles
      if (matchSchema) {
        const matchRolesGet = matchSchema.match_roles
        matchRoles = matchRolesGet
      } else {
        const obj = {
          guild,
          match_roles: []
        }
        const matchSchema3 = await matchModel.create(obj)

        matchRoles = []

      }


      //matching required roles
      const requiredMatchSchema = await requiredMatchModel.findOne({ guild })

      let requiredMatchRoles
      if (requiredMatchSchema) {
        const requiredMatchRolesGet = requiredMatchSchema.required_roles
        requiredMatchRoles = requiredMatchRolesGet
      } else {
        const obj = {
          guild,
          required_roles: []
        }
        const requiredMatchSchema3 = await requiredMatchModel.create(obj)

        requiredMatchRoles = []

      }

      //roles not allowed for match
      const disabledMatchSchema = await matchInfoModel.findOne({ guild })

      let disabledMatchRoles
      if (disabledMatchSchema) {
        const disabledMatchRolesGet = disabledMatchSchema.disabled_roles
        disabledMatchRoles = disabledMatchRolesGet
      } else {
        const obj = {
          guild,
          disabled_roles: []
        }
        const disabledMatchSchema3 = await matchInfoModel.create(obj)

        disabledMatchRoles = []

      }

      res.json({
        reactRoles,
        rules,
        automod,
        categories,
        requiredRoles,
        matchRoles,
        requiredMatchRoles,
        disabledMatchRoles
      })


    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'An error occurred while fetching data.' });
    }

  },

  dashboardSend: async (req, res) => {
    const { guild, automod, selfRolesData, rules, categories, requiredRoles, matchRoles, requiredMatchRoles, disabledRoles } = req.body


    try {


            //automod
            const automodSchema = await automodModel.findOne({ guild })

            let automodNew
            if (automodSchema) {
              const automodSchema2 = await automodModel.findOneAndUpdate({ guild }, { automod: automod })
      
              automodNew = automodSchema2.data
      
            } else {
              const obj = {
                guild,
                automod: automod
              }
              const automodSchema3 = await automodModel.create(obj)
      
              automodNew = automodSchema3.data
            }

      
      //self roles
      const selfRolesScehma = await reactionRolesModel.findOne({ guild })

      let reactRolesNew
      if (selfRolesScehma) {
        const selfRolesScehma2 = await reactionRolesModel.findOneAndUpdate({ guild }, { data: selfRolesData })

        reactRolesNew = selfRolesScehma2.data

      } else {
        const obj = {
          guild,
          data: selfRolesData
        }
        const selfRolesScehma3 = await reactionRolesModel.create(obj)

        reactRolesNew = selfRolesScehma3.data
      }


      //rules
      const rulesSchema = await rulesModel.findOne({ guild })

      let rulesNew
      if (rulesSchema) {
        const rulesSchema2 = await rulesModel.findOneAndUpdate({ guild }, { rules: rules })

        rulesNew = rulesSchema2.data

      } else {
        const obj = {
          guild,
          rules: rules
        }
        const rulesSchema3 = await rulesModel.create(obj)

        rulesNew = rulesSchema3.data
      }


      //tickeet categories
      const ticketCategoriesSchema = await ticketCategoriesModel.findOne({ guild })

      let categoriesNew
      if (ticketCategoriesSchema) {
        const ticketCategoriesSchema2 = await ticketCategoriesModel.findOneAndUpdate({ guild }, { categories: categories })

        categoriesNew = ticketCategoriesSchema2.data

      } else {
        const obj = {
          guild,
          categories: categories
        }
        const ticketCategoriesSchema3 = await ticketCategoriesModel.create(obj)

        categoriesNew = ticketCategoriesSchema3.data
      }


      //required roles to make profiles
      const requiredSchema = await serverProfilesModel.findOne({ guild })

      let requiredNew
      if (requiredSchema) {
        const requiredSchema2 = await serverProfilesModel.findOneAndUpdate({ guild }, { required_roles: requiredRoles })

        requiredNew = requiredSchema2.data

      } else {
        const obj = {
          guild,
          required_roles: requiredRoles
        }
        const requiredSchema3 = await serverProfilesModel.create(obj)

        requiredNew = requiredSchema3.data

      }


      //match roles
      const matchSchema = await matchModel.findOne({ guild })

      let matchNew
      if (matchSchema) {
        const matchSchema2 = await matchModel.findOneAndUpdate({ guild }, { match_roles: matchRoles })

        matchNew = matchSchema2.data

      } else {
        const obj = {
          guild,
          match_roles: matchRoles
        }
        const matchSchema3 = await matchModel.create(obj)

        matchNew = matchSchema3.data
      }


      //required match roles
      const requiredMatchRolesSchema = await requiredMatchModel.findOne({ guild })

      let requiredMatchRolesNew
      if (requiredMatchRolesSchema) {
        const requiredMatchRolesSchema2 = await requiredMatchModel.findOneAndUpdate({ guild }, { required_roles: requiredMatchRoles })

        requiredMatchRolesNew = requiredMatchRolesSchema2.data

      } else {
        const obj = {
          guild,
          required_roles: requiredMatchRoles
        }
        const requiredMatchRolesSchema3 = await requiredMatchModel.create(obj)

        requiredMatchRolesNew = requiredMatchRolesSchema3.data
      }

      //roles not allowed for match
      const disabledMatchSchema = await matchInfoModel.findOne({ guild })

      let disabledMatchRoles
      if (disabledMatchSchema) {
        const disabledMatchSchema2 = await matchInfoModel.findOneAndUpdate({ guild }, { disabled_roles: disabledRoles })

        disabledMatchRoles = disabledMatchSchema2.data

      } else {
        const obj = {
          guild,
          disabled_roles: disabledRoles
        }
        const disabledMatchSchema3 = await matchInfoModel.create(obj)

        disabledMatchRoles = disabledMatchSchema3.data
      }

      // sending selfroles, automd, rules and ticket categories
      res.json({
        status: true,
        reactRoles: reactRolesNew,
        automod: automodNew,
        rules: rulesNew,
        categories: categoriesNew,
        requiredRoles: requiredNew,
        matchRoles: matchNew,
        disabledMatchRoles
      })


    } catch (error) {
      res.status(500).send({ message: error.message });
    }

  },

  dashboardSend2: async (req, res) => {
    const { guild, giveawayPing, suggestionChannel, confessionChannel, confessionReplyChannel, nsfw, delmsgs, warnlogs, ticketlogs, kmbulogs, profilesChannels, applicationsChannel, verificationChannel, maleChannel, femaleChannel, nbgfChannel, unverified, searching, givenRole, maleRole, femaleRole, tnbgfRole, a18, a19, a20, a21, a22, a23, a24, a25, a26, a27, a28, a29, a30, a31, verified, verifiedMaleRole, verifiedFemaleRole, verifiedTnbgfRole, updatemsgs, matchLogs, confessionsLogs, membersJoinLogs, membersLeaveLogs, miscLogs, boostsLogs, muteRole } = req.body


    try {

      const uValues = [a18, a19, a20, a21, a22, a23, a24, a25, a26, a27, a28, a29, a30, a31]
      const values = []

      uValues.map(v =>{
        if(v){
          values.push(v)
        }
      })


      if (new Set(values).size != values.length) {
        res.json({
          message: 'Can not use same role for multiple ages!',
          status: false
        })
        return
      }


      if (giveawayPing) {
        const giveawaySchema = await giveawayPingModel.findOne({ guild })

        if (giveawaySchema) {
          const giveawaySchema2 = await giveawayPingModel.findOneAndUpdate({ guild }, { giveaway_ping: giveawayPing })
        } else {
          const obj = {
            guild,
            giveaway_ping: giveawayPing
          }
          const giveawaySchema3 = await giveawayPingModel.create(obj)
        }



      }

      if (unverified) {
        const unverifiedSchema = await unverifiedModel.findOne({ guild })

        if (unverifiedSchema) {
          const unverifiedSchema2 = await unverifiedModel.findOneAndUpdate({ guild }, { unverified_role: unverified })
        } else {
          const obj = {
            guild,
            unverified_role: unverified
          }
          const unverifiedSchema3 = await unverifiedModel.create(obj)
        }



      }

      if (suggestionChannel) {
        const suggestionSchema = await suggestionChannelModel.findOne({ guild })

        if (suggestionSchema) {
          const suggestionSchema2 = await suggestionChannelModel.findOneAndUpdate({ guild }, { suggestion_channel: suggestionChannel })
        } else {
          const obj = {
            guild,
            suggestion_channel: suggestionChannel
          }
          const suggestionSchema3 = await suggestionChannelModel.create(obj)
        }



      }

      if (confessionChannel) {
        const confessionSchema = await confessionChannelModel.findOne({ guild })

        if (confessionSchema) {
          const confessionSchema2 = await confessionChannelModel.findOneAndUpdate({ guild }, { confession_channel: confessionChannel })
        } else {
          const obj = {
            guild,
            confession_channel: confessionChannel
          }
          const confessionSchema3 = await confessionChannelModel.create(obj)

        }


      }

      if (confessionReplyChannel) {
        const confessionreplySchema = await confessionReplyChannelModel.findOne({ guild })

        if (confessionreplySchema) {
          const confessionreplySchema2 = await confessionReplyChannelModel.findOneAndUpdate({ guild }, { confession_reply_channel: confessionReplyChannel })
        } else {
          const obj = {
            guild,
            confession_reply_channel: confessionReplyChannel
          }
          const confessionreplySchema3 = await confessionReplyChannelModel.create(obj)

        }


      }

      if (nsfw) {
        const nsfwSchema = await nsfwChannelModel.findOne({ guild })

        if (nsfwSchema) {
          const nsfwSchema2 = await nsfwChannelModel.findOneAndUpdate({ guild }, { nsfw_channel: nsfw })
        } else {
          const obj = {
            guild,
            nsfw_channel: nsfw
          }
          const nsfwSchema3 = await nsfwChannelModel.create(obj)

        }


      }

      if (profilesChannels) {
        const profilesChannelsSchema = await profileChannelsModel.findOne({ guild })

        if (profilesChannelsSchema) {
          const profilesChannelsSchema2 = await profileChannelsModel.findOneAndUpdate({ guild }, { profiles_channel: profilesChannels })
        } else {
          const obj = {
            guild,
            profiles_channel: profilesChannels
          }
          const profilesChannelsSchema3 = await profileChannelsModel.create(obj)

        }


      }

      if (applicationsChannel) {
        const applicationsChannelSchema = await applicationsChannelModel.findOne({ guild })

        if (applicationsChannelSchema) {
          const applicationsChannelSchema2 = await applicationsChannelModel.findOneAndUpdate({ guild }, { application_channel: applicationsChannel })
        } else {
          const obj = {
            guild,
            application_channel: applicationsChannel
          }
          const applicationsChannelSchema3 = await applicationsChannelModel.create(obj)

        }


      }

      if (verificationChannel) {
        const verificationChannelSchema = await verificationChannelModel.findOne({ guild })

        if (verificationChannelSchema) {
          const verificationChannelSchema2 = await verificationChannelModel.findOneAndUpdate({ guild }, { verification_channel: verificationChannel })
        } else {
          const obj = {
            guild,
            verification_channel: verificationChannel
          }
          const verificationChannelSchema3 = await verificationChannelModel.create(obj)

        }


      }

      if (maleChannel) {
        const datingSchema = await profileChannelsModel.findOne({ guild })

        if (datingSchema) {
          const datingSchema2 = await profileChannelsModel.findOneAndUpdate({ guild }, { male_profiles_channel: maleChannel })
        } else {
          const obj = {
            guild,
            male_profiles_channel: maleChannel
          }
          const datingSchema3 = await profileChannelsModel.create(obj)

        }


      }

      if (femaleChannel) {
        const datingSchema = await profileChannelsModel.findOne({ guild })

        if (datingSchema) {
          const datingSchema2 = await profileChannelsModel.findOneAndUpdate({ guild }, { female_profiles_channel: femaleChannel })
        } else {
          const obj = {
            guild,
            female_profiles_channel: femaleChannel
          }
          const datingSchema3 = await profileChannelsModel.create(obj)

        }


      }

      if (nbgfChannel) {
        const datingSchema = await profileChannelsModel.findOne({ guild })

        if (datingSchema) {
          const datingSchema2 = await profileChannelsModel.findOneAndUpdate({ guild }, { tnbg_profiles_channel: nbgfChannel })
        } else {
          const obj = {
            guild,
            tnbg_profiles_channel: nbgfChannel
          }
          const datingSchema3 = await profileChannelsModel.create(obj)

        }


      }

      if (maleRole) {
        const genderSchema = await genderModel.findOne({ guild })

        if (genderSchema) {
          const genderSchema2 = await genderModel.findOneAndUpdate({ guild }, { male_role: maleRole })
        } else {
          const obj = {
            guild,
            male_role: maleRole
          }
          const genderSchema3 = await genderModel.create(obj)

        }


      }

      if (femaleRole) {
        const genderSchema = await genderModel.findOne({ guild })

        if (genderSchema) {
          const genderSchema2 = await genderModel.findOneAndUpdate({ guild }, { female_role: femaleRole })
        } else {
          const obj = {
            guild,
            female_role: femaleRole
          }
          const genderSchema3 = await genderModel.create(obj)

        }


      }

      if (tnbgfRole) {
        const genderSchema = await genderModel.findOne({ guild })

        if (genderSchema) {
          const genderSchema2 = await genderModel.findOneAndUpdate({ guild }, { tnbgf_role: tnbgfRole })
        } else {
          const obj = {
            guild,
            tnbgf_role: tnbgfRole
          }
          const genderSchema3 = await genderModel.create(obj)

        }


      }

      if (delmsgs) {
        const delmsgsSchema = await delmsgslogModel.findOne({ guild })

        if (delmsgsSchema) {
          const delmsgsSchema2 = await delmsgslogModel.findOneAndUpdate({ guild }, { message_delete_logs_channel: delmsgs })
        } else {
          const obj = {
            guild,
            message_delete_logs_channel: delmsgs
          }
          const delmsgsSchema3 = await delmsgslogModel.create(obj)

        }


      }

      if (updatemsgs) {
        const delmsgsSchema = await delmsgslogModel.findOne({ guild })

        if (delmsgsSchema) {
          const delmsgsSchema2 = await delmsgslogModel.findOneAndUpdate({ guild }, { message_update_logs_channel: updatemsgs })
        } else {
          const obj = {
            guild,
            message_update_logs_channel: updatemsgs
          }
          const delmsgsSchema3 = await delmsgslogModel.create(obj)

        }


      }

      if (warnlogs) {
        const warnlogsSchema = await warningslogModel.findOne({ guild })

        if (warnlogsSchema) {
          const warnlogsSchema2 = await warningslogModel.findOneAndUpdate({ guild }, { warnings_logs_channel: warnlogs })
        } else {
          const obj = {
            guild,
            warnings_logs_channel: warnlogs
          }
          const warnlogsSchema3 = await warningslogModel.create(obj)

        }


      }

      if (ticketlogs) {
        const ticketlogsSchema = await ticketslogModel.findOne({ guild })

        if (ticketlogsSchema) {
          const ticketlogsSchema2 = await ticketslogModel.findOneAndUpdate({ guild }, { tickets_logs_channel: ticketlogs })
        } else {
          const obj = {
            guild,
            tickets_logs_channel: ticketlogs
          }
          const ticketlogsSchema3 = await ticketslogModel.create(obj)

        }


      }

      if (kmbulogs) {
        const kmbulogsSchema = await kmbulogModel.findOne({ guild })

        if (kmbulogsSchema) {
          const kmbulogsSchema2 = await kmbulogModel.findOneAndUpdate({ guild }, { kmbu_logs_channel: kmbulogs })
        } else {
          const obj = {
            guild,
            kmbu_logs_channel: kmbulogs
          }
          const kmbulogsSchema3 = await kmbulogModel.create(obj)

        }


      }

      if (searching) {
        const datingSchema = await datingModel.findOne({ guild })

        if (datingSchema) {
          const datingSchema2 = await datingModel.findOneAndUpdate({ guild }, { allowed_role: searching })
        } else {
          const obj = {
            guild,
            allowed_role: searching
          }
          const datingSchema3 = await datingModel.create(obj)

        }


      }

      if (givenRole) {
        const matchSchema = await matchInfoModel.findOne({ guild })

        if (matchSchema) {
          const matchSchema2 = await matchInfoModel.findOneAndUpdate({ guild }, { given_role: givenRole })
        } else {
          const obj = {
            guild,
            given_role: givenRole
          }
          const matchSchema3 = await matchInfoModel.create(obj)

        }


      }

      if (a18) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_18: a18 })
        } else {
          const obj = {
            guild,
            age_18: a18
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (a19) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate( { guild }, { age_19: a19 })

        } else {
          const obj = {
            guild,
            age_19: a19
          }
          const ageSchema3 = await ageModel.create(obj)
        }


      }

      if (a20) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_20: a20 })
        } else {
          const obj = {
            guild,
            age_20: a20
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (a21) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_21: a21 })
        } else {
          const obj = {
            guild,
            age_21: a21
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (a22) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_22: a22 })
        } else {
          const obj = {
            guild,
            age_22: a22
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (a23) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_23: a23 })
        } else {
          const obj = {
            guild,
            age_23: a23
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (a24) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_24: a24 })
        } else {
          const obj = {
            guild,
            age_24: a24
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (a25) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_25: a25 })
        } else {
          const obj = {
            guild,
            age_25: a25
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (a26) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_26: a26 })
        } else {
          const obj = {
            guild,
            age_26: a26
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (a27) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_27: a27 })
        } else {
          const obj = {
            guild,
            age_27: a27
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (a28) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_28: a28 })
        } else {
          const obj = {
            guild,
            age_28: a28
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (a29) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_29: a29 })
        } else {
          const obj = {
            guild,
            age_29: a29
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (a30) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_30: a30 })
        } else {
          const obj = {
            guild,
            age_30: a30
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (a31) {
        const ageSchema = await ageModel.findOne({ guild })

        if (ageSchema) {
          const ageSchema2 = await ageModel.findOneAndUpdate({ guild }, { age_31: a31 })
        } else {
          const obj = {
            guild,
            age_31: a31
          }
          const ageSchema3 = await ageModel.create(obj)

        }


      }

      if (verified) {
        const verifiedSchema = await verifiedModel.findOne({ guild })

        if (verifiedSchema) {
          const verifiedSchema2 = await verifiedModel.findOneAndUpdate({ guild }, { age_verified_role: verified })
        } else {
          const obj = {
            guild,
            age_verified_role: verified
          }
          const verifiedSchema3 = await verifiedModel.create(obj)

        }


      }

      if (verifiedMaleRole) {
        const verifiedSchema = await verifiedModel.findOne({ guild })

        if (verifiedSchema) {
          const verifiedSchema2 = await verifiedModel.findOneAndUpdate({ guild }, { male_verified_role: verifiedMaleRole })
        } else {
          const obj = {
            guild,
            male_verified_role: verifiedMaleRole
          }
          const verifiedSchema3 = await verifiedModel.create(obj)

        }


      }

      if (verifiedFemaleRole) {
        const verifiedSchema = await verifiedModel.findOne({ guild })

        if (verifiedSchema) {
          const verifiedSchema2 = await verifiedModel.findOneAndUpdate({ guild }, { female_verified_role: verifiedFemaleRole })
        } else {
          const obj = {
            guild,
            female_verified_role: verifiedFemaleRole
          }
          const verifiedSchema3 = await verifiedModel.create(obj)

        }


      }

      if (verifiedTnbgfRole) {
        const verifiedSchema = await verifiedModel.findOne({ guild })

        if (verifiedSchema) {
          const verifiedSchema2 = await verifiedModel.findOneAndUpdate({ guild }, { tnbgf_verified_role: verifiedTnbgfRole })
        } else {
          const obj = {
            guild,
            tnbgf_verified_role: verifiedTnbgfRole
          }
          const verifiedSchema3 = await verifiedModel.create(obj)

        }


      }

      if (matchLogs) {
        const cmSchema = await cmModel.findOne({ guild })

        if (cmSchema) {
          const cmSchema2 = await cmModel.findOneAndUpdate({ guild }, { match_logs_channel: matchLogs })
        } else {
          const obj = {
            guild,
            match_logs_channel: matchLogs
          }
          const cmSchema3 = await cmModel.create(obj)

        }


      }

      if (confessionsLogs) {
        const cmSchema = await cmModel.findOne({ guild })

        if (cmSchema) {
          const cmSchema2 = await cmModel.findOneAndUpdate({ guild }, { confessions_logs_channel: confessionsLogs })
        } else {
          const obj = {
            guild,
            confessions_logs_channel: confessionsLogs
          }
          const cmSchema3 = await cmModel.create(obj)

        }


      }

      if (membersJoinLogs) {
        const membersSchema = await membersModel.findOne({ guild })

        if (membersSchema) {
          const membersSchema2 = await membersModel.findOneAndUpdate({ guild }, { members_join_logs_channel: membersJoinLogs })
        } else {
          const obj = {
            guild,
            members_join_logs_channel: membersJoinLogs
          }
          const membersSchema3 = await membersModel.create(obj)

        }


      }

      if (membersLeaveLogs) {
        const membersSchema = await membersModel.findOne({ guild })

        if (membersSchema) {
          const membersSchema2 = await membersModel.findOneAndUpdate({ guild }, { members_leave_logs_channel: membersLeaveLogs })
        } else {
          const obj = {
            guild,
            members_leave_logs_channel: membersLeaveLogs
          }
          const membersSchema3 = await membersModel.create(obj)

        }


      }

      if (miscLogs) {
        const otherLogsSchema = await otherLogsModel.findOne({ guild })

        if (otherLogsSchema) {
          const otherLogsSchema2 = await otherLogsModel.findOneAndUpdate({ guild }, { misc_logs_channel: miscLogs })
        } else {
          const obj = {
            guild,
            misc_logs_channel: miscLogs
          }
          const otherLogsSchema3 = await otherLogsModel.create(obj)

        }


      }

      if (boostsLogs) {
        const otherLogsSchema = await otherLogsModel.findOne({ guild })

        if (otherLogsSchema) {
          const otherLogsSchema2 = await otherLogsModel.findOneAndUpdate({ guild }, { boosts_logs_channel: boostsLogs })
        } else {
          const obj = {
            guild,
            boosts_logs_channel: boostsLogs
          }
          const otherLogsSchema3 = await otherLogsModel.create(obj)

        }


      }

      if (muteRole) {
        const muteRoleSchema = await muteRoleModel.findOne({ guild })

        if (muteRoleSchema) {
          const muteRoleSchema2 = await muteRoleModel.findOneAndUpdate({ guild }, { role: muteRole })
        } else {
          const obj = {
            guild,
            role: muteRole
          }
          const muteRoleSchema3 = await muteRoleModel.create(obj)

        }


      }

      res.json({
        message: 'Successfully saved',
        status: true
      })

    } catch (error) {
      res.status(500).send({ message: error.message });
    }

  }


}

module.exports = dashboard