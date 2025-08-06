import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Box,
  ListItemIcon,
} from "@mui/material";
import { fontStyles } from "@/theme/theme";
import { Circle } from "@mui/icons-material";
import SEO from "../components/SEO";

const TermsAndConditions = () => {
  return (
    <>
      <SEO
        title="Terms and Conditions - MoneyTV | User Agreement & Terms of Service"
        description="Read Money TV's Terms and Conditions to understand the rules, rights, and responsibilities when using our platform. Learn about user agreements and terms of service."
        keywords="terms and conditions, terms of service, user agreement, money tv terms, legal terms, platform rules, user rights, terms of use India"
        type="website"
      />

    <Container
      maxWidth="md"
      sx={{ py: 2, width: "800px", maxWidth: "100%", textAlign: "justify" }}
    >
      <Typography
        variant="h5"
          component="h1"
        textAlign="center"
        color="text.primary"
        gutterBottom
        sx={{
          ...fontStyles.openSans.bold,
          fontWeight: 700,
        }}
        mb={4}
      >
        TERMS AND CONDITIONS
      </Typography>
      <Typography
        sx={{
          ...fontStyles.openSans.regular,
        }}
        variant="termsText"
        paragraph
        mb={4}
      >
        Last updated on: 11th July, 2025
      </Typography>

      <Typography
        variant="termsText"
        sx={{ ...fontStyles.openSans.regular, mb: 2 }}
        paragraph
      >
        Thank you for using / visiting
        <Link
          href="https://www.moneytv.live"
          color="primary.main"
          sx={{ textDecoration: "underline", mx: "0.35rem" }}
        >
          www.moneytv.live
        </Link>
        ('Platform'). The Platform is operated by Aidia Technovations Private
        Limited ('MoneyTV' or 'Company'). 'You' (Visitor/User) (whenever the
        context may require, any pronoun shall include the corresponding
        masculine, feminine and neuter forms) means you individually or the
        entity you represent (and as applicable, the users).
      </Typography>
      <Typography
        variant="termsText"
        sx={{ ...fontStyles.openSans.regular, mb: 2 }}
        paragraph
      >
        By using the Platform including but not limited to accessing or visiting
        or browsing the website, You indicate your acceptance to these Terms and
        Conditions
        <Typography
          variant="termsText"
          sx={{ ...fontStyles.openSans.regular, fontWeight: 700, ml: 0.6 }}
        >
          (Terms)
        </Typography>{" "}
        and agree to abide by them. The Terms constitute a legal agreement
        between You, as the user / visitor of the Platform and Company. If you
        do not agree to these Terms, please refrain from using this Website.
      </Typography>
      <Typography
        variant="termsText"
        sx={{ ...fontStyles.openSans.regular, mb: 2 }}
        paragraph
      >
        The reference to the term 'Platform' includes, but is not limited to,
        all the mobile app, web app, content, data, reports, analysis, views,
        codes, etc. available or accessible on the Platform. The Platform is not
        available to persons who are not legally eligible to be bound by these
        Terms.
      </Typography>
      <Typography
        variant="termsText"
        sx={{ ...fontStyles.openSans.regular, mb: 2 }}
        paragraph
      >
        Additional agreement(s) like User or Service Agreement may apply to use
        certain services through the Platform. Such agreement(s) will be
        disclosed to You in connection with the applicable service or activity.
        Any such supplemental agreements are in addition to these terms, and in
        the event of a conflict, prevail over these Terms.
      </Typography>

      <Typography
        variant="termsText"
        component="h2"
        mb={2}
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        <Typography
          variant="termsText"
          sx={{
            ...fontStyles.openSans.regular,
            fontWeight: 700,
          }}
        >
          1. The Platform
        </Typography>
      </Typography>
      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        1.1.
        <Typography
          variant="termsText"
          sx={{ mx: 1, ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          General:
        </Typography>
      </Typography>
      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
        }}
        paragraph
      >
        "Money TV" is a visionary platform that bridges the gap between
        companies, investors and market intermediaries by delivering
        transparent, actionable and one-of-its-kind - Content and intelligence.
      </Typography>
      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        1.2.
        <Typography
          variant="termsText"
          sx={{ mx: 1, ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          Platform Usage:
        </Typography>
      </Typography>
      <List sx={{ pl: 0, mb: 1, pt: 0, pb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.2.1. MoneyTV permits You to use the Platform rightfully subject to the validity of the Terms."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.2.2. Visitor who wishes to use one or more of the services and/or one or more of the products presented on the Platform can contact us to ascertain the contractual obligations or conditions and charges applicable to those products and/or services."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.2.3. If You are interested to use Platform and/or other services, in order to have full functionality or additional features of the Platform, You may be required to register or setup an account and sign additional agreement(s) like User or Service Agreement with the Company to become premium user on the MoneyTV Platform. In case of a conflict between the Terms and the specific conditions governing stated under the relevant User or Service Agreement, the specific conditions of relevant User or Service Agreement shall prevail."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.2.4. Upon your successful onboarding to the Platform, the Company would grant access to the Platform or certain parts of it, which would allow You to use additional features of the Platform."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.2.5. You acknowledge that you are legally eligible and has the skill and resources necessary to gain access to this Platform and use it. In case, You are accessing the platform on behalf of the entity, necessary authorization is obtained from such entity to abide by the Terms."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.2.6. You represent that all the information provided by You are true, correct, and accurate and You shall inform us of any change / amendment in such information from time to time. In addition, in case, you are using this Platform on behalf of the entity, you agree to keep us updated of any change / amendment in such authorization from such entity."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0, pt: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.2.7. You are responsible for:"
          />
        </ListItem>
        <List sx={{ pl: 4, py: 0 }}>
          <ListItem sx={{ py: 0, px: 0 }}>
            <ListItemText
              primaryTypographyProps={{
                variant: "termsText",
                ...fontStyles.openSans.regular,
                textAlign: "justify",
              }}
              primary="(i) actions taken by any other person using user accounts added under Your subscription or by any other user using, accessing, or reviewing the Platform using Your accounts and passwords."
            />
          </ListItem>
          <ListItem sx={{ py: 0, px: 0 }}>
            <ListItemText
              primaryTypographyProps={{
                variant: "termsText",
                ...fontStyles.openSans.regular,
                textAlign: "justify",
              }}
              primary="(ii) Your user information."
            />
          </ListItem>
          <ListItem sx={{ py: 0, px: 0 }}>
            <ListItemText
              primaryTypographyProps={{
                variant: "termsText",
                ...fontStyles.openSans.regular,
                textAlign: "justify",
              }}
              primary="(iii) Compliance to the Terms."
            />
          </ListItem>
        </List>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.2.8. If You believe that Your user details have been compromised including any unauthorized access to or use or disclosure of any account information, passwords, user names or login credentials, You must notify the Company vide means including but not limited to communicating in accordance with the means prescribed by the Company."
          />
        </ListItem>
      </List>
      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        1.3.
        <Typography
          variant="termsText"
          sx={{ mx: 1, ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          Content
        </Typography>
      </Typography>
      <List sx={{ pl: 0, mb: 0, pt: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.3.1. We strive to ensure the accuracy, updating and exhaustiveness of the information on the Platform and reserve the right to change the content or presentation of the Platform at any time and without notice."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.3.2. We cannot be held liable for any decision made on the basis of information contained on the website."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.3.3. Certain people or certain countries may be allowed only restricted access to the products and services presented on the Platform."
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        1.4.
        <Typography
          variant="termsText"
          sx={{ mx: 1, ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          Modifications
        </Typography>
      </Typography>

      <List sx={{ pl: 0, mb: 0, pt: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.4.1. The Company may from time to time (a) modify the Terms, or (b) cease providing any service on the Platform."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.4.2. The changes will become effective on the date published or as notified but in no case be less than 30 days after the date, we publish notice of those changes or modifications (except for new functionality which may take effect immediately)."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="1.4.3. The continued use of the Platform after the effective date of any change will be deemed acceptance of the modified Terms."
          />
        </ListItem>
      </List>
      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        1.5.
        <Typography
          variant="termsText"
          sx={{ mx: 1, ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          License
        </Typography>
      </Typography>
      <Typography
        variant="termsText"
        sx={{ ...fontStyles.openSans.regular, pl: 0, mb: 0 }}
        paragraph
      >
        Permission is granted to use the materials (information or software) on
        platform for personal, non-commercial transitory viewing only. This is
        the grant of a limited, non-exclusive, non-assignable and
        non-transferable license to access, not a transfer of title, which is
        provided and expressly conditioned upon your agreement that all such
        access and use shall be governed by all of the terms and conditions set
        forth herein. and under this license you may not:
      </Typography>
      <List sx={{ pl: 2, py: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemIcon sx={{ minWidth: "20px" }}>
            <Circle sx={{ fontSize: "8px", color: "text.primary" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="modify or copy the materials;"
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemIcon sx={{ minWidth: "20px" }}>
            <Circle sx={{ fontSize: "8px", color: "text.primary" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="use the materials for any commercial purpose, or for any public display (commercial or non-commercial);"
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemIcon sx={{ minWidth: "20px" }}>
            <Circle sx={{ fontSize: "8px", color: "text.primary" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="attempt to decompile or reverse engineer any software contained on Site;"
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemIcon sx={{ minWidth: "20px" }}>
            <Circle sx={{ fontSize: "8px", color: "text.primary" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="remove any copyright or other proprietary notations from the materials; or"
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemIcon sx={{ minWidth: "20px" }}>
            <Circle sx={{ fontSize: "8px", color: "text.primary" }} />
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="transfer the materials to another person or 'mirror' the materials on any other server."
          />
        </ListItem>
      </List>
      <Typography
        variant="termsText"
        sx={{ ...fontStyles.openSans.regular, pl: 0, mb: 1 }}
        paragraph
      >
        This license shall automatically terminate if you violate any of these
        restrictions and may be terminated by us at any time. Upon terminating
        your viewing of these materials or upon the termination of this license,
        you must destroy any downloaded materials in your possession whether in
        electronic or printed format.
      </Typography>
      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
        }}
      >
        1.6.
        <Typography
          variant="termsText"
          sx={{ mx: 1, ...fontStyles.openSans.regular, fontWeight: 700 }}
        >
          Optional Feedback
        </Typography>
      </Typography>

      <Typography
        variant="termsText"
        sx={{ ...fontStyles.openSans.regular, mb: 2 }}
        paragraph
      >
        You may provide comments and suggestions regarding the Platform, but You
        are not required to do so. If you provide comments or suggestions, the
        Company may use that feedback without restriction, and You hereby
        irrevocably assign to us all right, title, and interest in and to that
        feedback. Subject to the preceding sentence regarding any feedback you
        provide, providing any comments and suggestions does not grant us any
        rights in your intellectual property.
      </Typography>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        2. Data Security
      </Typography>

      <List sx={{ pl: 0, px: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="2.1. You are responsible for taking and maintaining appropriate steps to protect the confidentiality, integrity, and security of Your use of the Platform."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="2.2. The Company would maintain reasonable physical and technical safeguards to prevent unauthorized disclosure of or access to Your user information, in accordance with the industry standards. The Company will notify You if it becomes aware of any unauthorized access to Your user information. The Company will not access, view, or process Your user information except"
          />
        </ListItem>
        <List sx={{ pl: 4, py: 0 }}>
          <ListItem sx={{ py: 0, px: 0 }}>
            <ListItemText
              primaryTypographyProps={{
                variant: "termsText",
                ...fontStyles.openSans.regular,
                textAlign: "justify",
              }}
              primary="(a) as provided in these Terms and in the Privacy Policy;"
            />
          </ListItem>
          <ListItem sx={{ py: 0, px: 0 }}>
            <ListItemText
              primaryTypographyProps={{
                variant: "termsText",
                ...fontStyles.openSans.regular,
                textAlign: "justify",
              }}
              primary="(b) as authorized or instructed by You;"
            />
          </ListItem>
          <ListItem sx={{ py: 0, px: 0 }}>
            <ListItemText
              primaryTypographyProps={{
                variant: "termsText",
                ...fontStyles.openSans.regular,
                textAlign: "justify",
              }}
              primary="(c) as required by applicable law."
            />
          </ListItem>
        </List>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="The Company has no other obligations with respect to Your user information."
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        3. Copyright & No Retransmission of Information
      </Typography>

      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0.5, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
            }}
            primary={
              <Typography
                sx={{
                  ...fontStyles.openSans.regular,
                  textAlign: "justify",
                  mb: 0,
                }}
                variant="termsText"
                paragraph
              >
                3.1 All parts of the Platform are protected by copyrights,
                trademarks, and other proprietary rights, as a collective work
                or compilation, pursuant to laws and international conventions (
                <Typography
                  variant="termsText"
                  sx={{
                    ...fontStyles.openSans.regular,
                    fontWeight: 700,
                  }}
                >
                  'Intellectual Property Rights'
                </Typography>
                ). The Company owns all right, title and interest in the
                Platform and any related improvements, enhancements,
                modifications and derivative works of them and all Intellectual
                Property Rights in all of them. Your rights to use the Platform
                are limited to those expressly granted in these Terms.
              </Typography>
            }
          />
        </ListItem>
        <ListItem sx={{ py: 0.5, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="3.2 MoneyTV as well as the design and information contained in this site is the valuable, exclusive property of MoneyTV, and nothing in this Agreement shall be construed as transferring or assigning any such ownership rights to You or any other person or entity. All information on MoneyTV is the proprietary, confidential property of MoneyTV and cannot be repeated for any reason outside the MoneyTV. You agree not to repeat or rebroadcast in any way any of the made available on MoneyTV for any reason whatsoever. You agree that if you do repeat or re-post any of MoneyTV information by any mean, you will be liable for actual and punitive damages as determined by MoneyTV and additional damages to be determined by a Indian court of Law."
          />
        </ListItem>
        <ListItem sx={{ py: 0.5, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="3.3 You shall not resell, redistribute, broadcast or transfer the information or use the information in a searchable, machine-readable database unless separately and specifically authorized in writing by MoneyTV prior to such use. You shall not rent, lease, sublicense, distribute, transfer, copy, reproduce, publicly display, publish, adapt, store or time-share MoneyTV, any part thereof, or any of the information received or accessed therefrom to or through any other person or entity unless separately and specifically authorized in writing by MoneyTV prior to such use. In addition, you may not remove, alter or obscure any copyright, legal or proprietary notices in or on any portions of MoneyTV without prior written authorization Except as set forth herein, any other use of the information contained in this site requires the prior written consent of MoneyTV and may require a separate fee."
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        4. Third Party Services
      </Typography>
      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="4.1. When using the Platform in conjunction with other third party services, You will comply with the terms of service of such third party services including any separate fees or charges imposed by the provider of the third party service."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="4.2. MoneyTV also holds discretion to suspend or terminate provision and hosting of any third party service at any time; and that such suspension or termination would not be deemed to be a material change."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="4.3. You may be able to access and view third party websites / apps through Platform. The links are provided for your convenience only and may not be updated at all times."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="4.4. You agree that your access to any third party website is governed by the Terms and Conditions of that website and has no relation to the Terms of the Platform. You agree and understand that it is your responsibility to comply with the terms and conditions of that website as well."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="4.5 The links in this site will allow you to leave MoneyTV. The linked sites are not under the control of MoneyTV. MoneyTV has not reviewed, nor approved these sites and is not responsible for the contents or omissions of any linked site or any links contained in a linked site. The inclusion of any linked site does not imply endorsement by MoneyTV of the site. Use of any such linked website is at the user's own risk and shall be governed by terms of use and privacy policy of respective sites."
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        5. Undertakings
      </Typography>
      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="5.1. You assume full responsibility for Your use of the Platform in accordance with this Terms and with applicable local, state, federal, national, and international laws, regulations and treaties, and warrant that you have obtained all rights in the user information to authorize the Company to input, process, distribute and display the user information as contemplated by these Terms."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="5.2. You will not use the Platform or user information for any use or purpose that:"
          />
        </ListItem>

        <Box ml={2}>
          <Box display="flex" mb={0.5}>
            <Typography
              sx={{
                minWidth: "2rem",
                fontWeight: 700,
                ...fontStyles.openSans.regular,
              }}
            >
              i.
            </Typography>
            <Typography
              sx={{ flex: 1, ...fontStyles.openSans.regular }}
              variant="termsText"
            >
              is obscene, libelous, blasphemous, defamatory, inciting hatred,
              terrorism, or any similar offence.
            </Typography>
          </Box>

          <Box display="flex" mb={0.5}>
            <Typography
              sx={{
                minWidth: "2rem",
                fontWeight: 700,
                ...fontStyles.openSans.regular,
              }}
            >
              ii.
            </Typography>
            <Typography
              sx={{ flex: 1, ...fontStyles.openSans.regular }}
              variant="termsText"
            >
              infringes or misappropriates the intellectual property rights or
              violates the privacy rights of any third party (including without
              limitation, copyright, trademark, patent, trade secret, or other
              intellectual property right, moral right, or right of publicity).
            </Typography>
          </Box>

          <Box display="flex" mb={0.5}>
            <Typography
              sx={{
                minWidth: "2rem",
                fontWeight: 700,
                ...fontStyles.openSans.regular,
              }}
            >
              iii.
            </Typography>
            <Typography
              sx={{ flex: 1, ...fontStyles.openSans.regular }}
              variant="termsText"
            >
              contains any data that You do not have a right to upload into the
              Platform.
            </Typography>
          </Box>

          <Box display="flex" mb={0.5}>
            <Typography
              sx={{
                minWidth: "2rem",
                fontWeight: 700,
                ...fontStyles.openSans.regular,
              }}
            >
              iv.
            </Typography>
            <Typography
              sx={{ flex: 1, ...fontStyles.openSans.regular }}
              variant="termsText"
            >
              is in violation or may encourage any manner of acting that would
              violate any applicable local, state, national and foreign laws,
              treatises, and regulations; or
            </Typography>
          </Box>

          <Box display="flex" mb={0.5}>
            <Typography
              sx={{
                minWidth: "2rem",
                fontWeight: 700,
                ...fontStyles.openSans.regular,
              }}
            >
              v.
            </Typography>
            <Typography
              sx={{ flex: 1, ...fontStyles.openSans.regular }}
              variant="termsText"
            >
              may drive or encourage any third party to do any of the above.
            </Typography>
          </Box>
        </Box>

        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="5.3. You will not:"
          />
        </ListItem>

        <Box ml={2}>
          <Box display="flex" mb={0.5}>
            <Typography
              sx={{
                minWidth: "2rem",
                fontWeight: 700,
                ...fontStyles.openSans.regular,
              }}
            >
              i.
            </Typography>
            <Typography
              sx={{ flex: 1, ...fontStyles.openSans.regular }}
              variant="termsText"
            >
              use the Platform for non-business related purposes or abuse the
              Platform;
            </Typography>
          </Box>

          <Box display="flex" mb={0.5}>
            <Typography
              sx={{
                minWidth: "2rem",
                fontWeight: 700,
                ...fontStyles.openSans.regular,
              }}
            >
              ii.
            </Typography>
            <Typography
              sx={{ flex: 1, ...fontStyles.openSans.regular }}
              variant="termsText"
            >
              modify, remove, or amend Company's name or logo, update,
              reproduce, duplicate, copy all or any part of the Platform;
            </Typography>
          </Box>

          <Box display="flex" mb={0.5}>
            <Typography
              sx={{
                minWidth: "2rem",
                fontWeight: 700,
                ...fontStyles.openSans.regular,
              }}
            >
              iii.
            </Typography>
            <Typography
              sx={{ flex: 1, ...fontStyles.openSans.regular }}
              variant="termsText"
            >
              use the Platform in any way that restricts or inhibits the use of
              the Platform;
            </Typography>
          </Box>

          <Box display="flex" mb={0.5}>
            <Typography
              sx={{
                minWidth: "2rem",
                fontWeight: 700,
                ...fontStyles.openSans.regular,
              }}
            >
              iv.
            </Typography>
            <Typography
              sx={{ flex: 1, ...fontStyles.openSans.regular }}
              variant="termsText"
            >
              access or attempt to access any of the Company's systems, programs
              or data that are not made available for public use, or attempt to
              bypass any registration processes on the Platform or any of the
              Platform's security and traffic management devices; or
            </Typography>
          </Box>

          <Box display="flex" mb={0.5}>
            <Typography
              sx={{
                minWidth: "2rem",
                fontWeight: 700,
                ...fontStyles.openSans.regular,
              }}
            >
              v.
            </Typography>
            <Typography
              sx={{ flex: 1, ...fontStyles.openSans.regular }}
              variant="termsText"
            >
              attempt to decompile, disassemble, re-engineer or reverse engineer
              the Platform or otherwise create or attempt to create or permit,
              allow, or assist others to extract source code of the Platform,
              its structural framework or allow or facilitate a third party, to
              violate or infringe any rights of MoneyTV;
            </Typography>
          </Box>

          <Box display="flex" mb={0.5}>
            <Typography
              sx={{
                minWidth: "2rem",
                fontWeight: 700,
                ...fontStyles.openSans.regular,
              }}
            >
              vi.
            </Typography>
            <Typography
              sx={{ flex: 1, ...fontStyles.openSans.regular }}
              variant="termsText"
            >
              transmit any unnecessary information or unwanted electronic
              communication viz. spam to other users of the Platform;
            </Typography>
          </Box>

          <Box display="flex" mb={0.5}>
            <Typography
              sx={{
                minWidth: "2rem",
                fontWeight: 700,
                ...fontStyles.openSans.regular,
              }}
            >
              vii.
            </Typography>
            <Typography
              sx={{ flex: 1, ...fontStyles.openSans.regular }}
              variant="termsText"
            >
              misuse your right to the Platform by introducing viruses, trojans,
              worms or other material likely to cause harm to the Platform.
            </Typography>
          </Box>
        </Box>

        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="5.4. If MoneyTV reasonably believes that a problem with the use of the Platform may be attributable to Your use of the Platform, You must cooperate to identify the source of the error and resolve the same."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="5.5. You may not access or use the Platform if you are a direct competitor of the Company, or for monitoring the Platform's availability, performance, or functionality, or for any other benchmarking or competitive purposes."
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        6. Disclaimers
      </Typography>
      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="6.1. The Platform may be under constant upgrades, and some functions and features may not be fully operational."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="6.2. You agree and understand that the information displayed on the Platform is for information purposes only and does not to amount to any advice."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="6.3. We disclaim any liability arising due to the vagaries that can occur in the electronic distribution of information."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="6.4. You acknowledge that third party services are available on the Platform. We may have formed partnerships or alliances with some of these third parties from time to time in order to facilitate the provision of certain services to you. However, you acknowledge and agree that at no time are we making any representation or warranty regarding any third party's services, nor will we be liable to you or any third party for any consequences or claims arising from or in connection with such third party including, and not limited to, any liability or responsibility for, death, injury or impairment experienced by you or any third party. You hereby disclaim and waive any rights and claims you may have against us with respect to third party's services."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="6.5. We do not, in any way, endorse any information or service offered or described herein. In no event shall we be liable to you or any third party for any decision made or action taken in reliance on such information."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="6.6. You assume all responsibility and risk with respect to your use of the Platform. The services are available 'as is,' and 'as available'. you understand and agree that, to the fullest extent permitted by law, we disclaim all warranties, representations, and endorsements, express or implied, with regard to the Platform, including, without limitation, implied warranties of title, merchantability, non-infringement and fitness for a particular purpose."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="6.7. We use reasonable efforts to make available the Platform for a continuous and uninterrupted use. We do not warrant or in any way guarantee, use of the Platform will be uninterrupted or error-free or that errors will be detected or corrected. We do not assume any liability or responsibility for any computer viruses, bugs, malicious code or other harmful components, delays, inaccuracies, errors or omissions, or the accuracy, completeness, reliability, or usefulness of the information disclosed or accessed through the services. Further, we may from time-to-time perform service maintenance and use reasonable efforts to schedule system down-time to off-peak hours to avoid service interruption and delays."
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        7. Warranties
      </Typography>
      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="7.1. Each of You and the Company represents, warrants, and covenants to the other that: (a)  it has the full corporate right, power, and authority to enter into and perform and accept these Terms, and such execution and performance does not and will not violate any other agreement to which it is a party, and (b) these Terms constitute its legal, valid and binding obligation."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="7.2. YOU EXPRESSLY AGREE THAT USE OF THE WEBSITE IS AT YOUR SOLE RISK. THE CONTENTS, INFORMATION, SOFTWARE, PRODUCTS, FEATURES AND SERVICES PUBLISHED ON THIS WEB SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE CONTENTS HEREIN. MoneyTV AND/OR ITS RESPECTIVE SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THIS WEB SITE AT ANY TIME. THIS WEB SITE MAY BE TEMPORARILY UNAVAILABLE FROM TIME TO TIME DUE TO REQUIRED MAINTENANCE, TELECOMMUNICATIONS INTERRUPTIONS, OR OTHER DISRUPTIONS. MoneyTV (AND ITS OWNERS, SUPPLIERS, CONSULTANTS, ADVERTISERS, AFFILIATES, PARTNERS, EMPLOYEES OR ANY OTHER ASSOCIATED ENTITIES, ALL COLLECTIVELY REFERRED TO AS ASSOCIATED ENTITIES HEREAFTER) SHALL NOT BE LIABLE TO USER OR MEMBER OR ANY THIRD PARTY SHOULD MoneyTV EXERCISE ITS RIGHT TO MODIFY OR DISCONTINUE ANY OR ALL OF THE CONTENTS, INFORMATION, SOFTWARE, PRODUCTS, FEATURES AND SERVICES PUBLISHED ON THIS WEBSITE."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="7.3 MoneyTV AND/OR ITS RESPECTIVE ASSOCIATED ENTITIES MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY OF THE CONTENTS, INFORMATION, SOFTWARE, PRODUCTS, FEATURES AND SERVICES CONTAINED ON THIS WEB SITE FOR ANY PURPOSE. ALL SUCH CONTENTS, INFORMATION, SOFTWARE, PRODUCTS, FEATURES AND SERVICES ARE PROVIDED 'AS IS' WITHOUT WARRANTY OF ANY KIND. MoneyTV AND/OR ITS ASSOCIATED ENTITIES HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THESE CONTENTS, INFORMATION, SOFTWARE, PRODUCTS, FEATURES AND SERVICES, INCLUDING ALL IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND AVAILABILITY."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="7.4 IN NO EVENT SHALL MoneyTV AND/OR ITS ASSOCIATED ENTITIES BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF THIS WEB SITE OR ANY CONSEQUENCES ARISING OUT OF INFORMATION SUBMITTED BY YOU OR WITH THE DELAY OR INABILITY TO USE THIS WEBSITE, OR FOR ANY CONTENTS, INFORMATION, SOFTWARE, PRODUCTS, FEATURES AND SERVICES OBTAINED THROUGH THIS WEB SITE, OR OTHERWISE ARISING OUT OF THE USE OF THIS WEB SITE, WHETHER BASED ON CONTRACT, TORT, STRICT LIABILITY OR OTHERWISE, EVEN IF MoneyTV OR ANY OF ITS ASSOCIATED ENTITIES HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES"
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="7.5 EXCEPT AS EXPRESSLY PROVIDED ABOVE, TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE COMPANY EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. WITHOUT LIMITING THE ABOVE, WE MAKE NO WARRANTY WHATSOEVER WITH RESPECT TO"
          />
        </ListItem>
        <List sx={{ pl: 4, py: 0 }}>
          <ListItem sx={{ py: 0, px: 0 }}>
            <ListItemText
              primaryTypographyProps={{
                variant: "termsText",
                ...fontStyles.openSans.regular,
                textAlign: "justify",
              }}
              primary="(I) THE PLATFORM MEETING YOUR REQUIREMENTS, OR BEING UNINTERRUPTED, CONTINUOUS, TIMELY, OR ERROR OR VIRUS FREE;"
            />
          </ListItem>
          <ListItem sx={{ py: 0, px: 0 }}>
            <ListItemText
              primaryTypographyProps={{
                variant: "termsText",
                ...fontStyles.openSans.regular,
                textAlign: "justify",
              }}
              primary="(II) WHETHER YOUR USE OF THE PLATFORM WILL GENERATE ANY RESULTS OR CONSEQUENCES; OR"
            />
          </ListItem>
          <ListItem sx={{ py: 0, px: 0 }}>
            <ListItemText
              primaryTypographyProps={{
                variant: "termsText",
                ...fontStyles.openSans.regular,
                textAlign: "justify",
              }}
              primary="(III) WHETHER YOUR USE OF THE PLATFORM IS LAWFUL IN ANY PARTICULAR JURISDICTION."
            />
          </ListItem>
        </List>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        8. Confidentiality
      </Typography>
      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
            }}
            primary={
              <Typography
                variant="termsText"
                sx={{
                  ...fontStyles.openSans.regular,
                  textAlign: "justify",
                  mb: 0,
                }}
                paragraph
              >
                8.1.{" "}
                <Typography
                  variant="termsText"
                  sx={{ ...fontStyles.openSans.regular, fontWeight: 700 }}
                >
                  'Confidential Information'
                </Typography>{" "}
                means all information provided by a party to other party,
                whether orally or in writing, that is designated as confidential
                or that reasonably should be understood to be confidential given
                the nature of the information and the circumstances of
                disclosure and excluding any information that was or has become
                publicly available without the receiving party's actions or
                inactions.
              </Typography>
            }
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="8.2. The Company's confidential information includes, without limitation, the Platform's features, functionality and performance and any feedback."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="8.3. Your Confidential Information does not, for purposes of the Terms, include Your user information. If you disclose Your user information to us or if the access to Your user information is permitted by these Terms, including for purposes of providing support to you, the Company will use the same standard of care with respect to that data as it uses to protect its own Confidential Information."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="8.4. Each party would hold the other party's Confidential Information in strict confidence and not make available the other party's Confidential Information available to any third party unless to the extent required by applicable law, implement adequate security measures to ensure against unauthorized access to use or copying of each other's Confidential Information and notify the other party in writing of any misuse or misappropriation of the other party's Confidential Information of which the receiving party may become aware."
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        9. Termination
      </Typography>
      <Typography
        variant="termsText"
        sx={{ ...fontStyles.openSans.regular, pl: 0, mb: 0, mt: 1 }}
        paragraph
      >
        This Agreement and the license rights granted hereunder shall remain in
        full force and effect unless terminated or cancelled for any of the
        following reasons:
      </Typography>
      <List sx={{ pl: 2, mb: 0, py: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="(a) immediately for any unauthorized access or use by You;"
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="(b) immediately if You assign or transfer (or attempt the same) any rights granted to You under this Agreement;"
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="(c) immediately, if You violate any of the other terms and conditions of this Agreement."
          />
        </ListItem>
      </List>
      <Typography
        variant="termsText"
        sx={{ ...fontStyles.openSans.regular, pl: 0, mb: 2 }}
        paragraph
      >
        Termination or cancellation of this Agreement shall not affect any right
        or relief to which MoneyTV may be entitled, at law or in equity. Upon
        termination of this User Agreement, all rights granted to you will
        terminate and revert to MoneyTV. Except as set forth herein, regardless
        of the reason for cancellation or termination of this Agreement, the fee
        charged if any for access to MoneyTV is not refundable for any reason.
      </Typography>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        10. Indemnity
      </Typography>
      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="10.1. You agree to indemnify and hold us and our affiliates, successors and assigns, officers, directors, employees, agents, representatives, licensors, advertisers, suppliers, and operational service providers harmless from and against any and all losses, expenses, damages, costs, and expenses (including attorneys' fees), resulting from your use of the Services and / or any violation of this Terms. We reserve the right to assume the exclusive defense and control of any demand, claim or action arising hereunder or in connection with the Platform and all negotiations for settlement or compromise. You agree to fully cooperate with us in the defense of any such demand, claim, action, settlement, or compromise negotiations, as requested by us."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="10.2 If MoneyTV takes action (by itself or through its associate companies) to enforce any of the provisions of this User Agreement, including collection of any amounts due hereunder, MoneyTV shall be entitled to recover from you (and you agree to pay), in addition to all sums to which it is entitled or any other relief, at law or in equity, reasonable and necessary attorney's fees and any costs of any litigation."
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        11. Assignment
      </Typography>
      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="11.1. You may not assign or transfer rights arising out of these Terms, in whole or in part, by operation of law or otherwise, without the prior written consent of the Company. Any attempted assignment or transfer of the rights arising out of these Terms without such written consent will be void and will be a breach of the Terms. Subject to these limitations, the Terms will bind and inure to the benefit of the parties and their respective successors and assigns."
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        12. Notices
      </Typography>
      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="12.1. Any notice given by the Company under these Terms will be given (a) via email to the email address associated with Your account; or (b) any other method agreed upon the parties."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary={
              <Box sx={{ textAlign: "justify" }}>
                <Typography
                  variant="termsText"
                  sx={{ ...fontStyles.openSans.regular }}
                >
                  12.2. You must direct notices arising out of Your use of the
                  Platform requiring support or an address to the grievance to
                  via the email associated with Your Account to the following
                  email ID:
                  <Link
                    href="mailto:grow@moneytv.live"
                    color="primary.main"
                    sx={{ textDecoration: "underline", mx: "0.35rem" }}
                  >
                    grow@moneytv.live
                  </Link>
                  Attn.: Compliance Officer
                </Typography>
              </Box>
            }
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary={
              <Box sx={{ textAlign: "justify" }}>
                <Typography
                  variant="termsText"
                  sx={{ ...fontStyles.openSans.regular }}
                >
                  12.3. You must direct notices arising out of any condition
                  that requires a notice to be sent to the Company under these
                  Terms, to the following address:-
                </Typography>
                <br />
                <Typography
                  variant="termsText"
                  sx={{ ...fontStyles.openSans.regular, mt: 1 }}
                >
                  AIDIA TECHNOVATIONS PRIVATE LIMITED
                </Typography>
                <br />
                <Typography
                  variant="termsText"
                  sx={{ ...fontStyles.openSans.regular }}
                >
                  702, 7th Floor, Umang, Near Telephone Exchange
                </Typography>
                <br />
                <Typography
                  variant="termsText"
                  sx={{ ...fontStyles.openSans.regular }}
                >
                  P. M. Road, Vile Parle (East), Mumbai - 400057
                </Typography>
              </Box>
            }
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        13. Force Majeure
      </Typography>
      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="13.1. Neither You nor the Company would be liable for any delay or failure to perform its obligations under the Terms, except for Your payment obligations, due to any cause beyond Your or the Company's reasonable control including labour or other industrial disputes or disturbances, systemic electrical, telecommunications or other utility failures, earthquakes, storms, floods or other acts of natures, embargoes, riots, acts or orders of government, acts of terrorism or war, or outbreak of any disease declared as an epidemic or a pandemic by the relevant authority resulting in a situation making it reasonably difficult to perform its obligations under these Terms."
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        14. Language
      </Typography>
      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="14.1. The language used in the Terms is English and the English language version governs any conflict with a translation into any other language."
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        15. Independent Parties & Third-party Rights
      </Typography>
      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="15.1. The Company and You are independent parties, and the Terms is not to be construed to create a partnership, joint venture, agency, or employment relationship between us. Neither You nor the Company not any of our respective affiliates, officers, directors, or employees, is an agent of the other for any purpose or has an authority to bind the other."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="15.2. Other than as expressly provided in the Terms, the Terms do not create any rights for any person who is not a party to it, and only parties to the Terms may enforce any of its terms or rely on any exclusion or limitation contained in the Terms."
          />
        </ListItem>
      </List>

      <Typography
        variant="termsText"
        sx={{
          ...fontStyles.openSans.regular,
          fontWeight: 700,
        }}
      >
        16. Governing Law & Jurisdiction
      </Typography>
      <List sx={{ pl: 0, mb: 0 }}>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="16.1. The Terms will be governed by the law of India, without regard to any conflicts of law principles."
          />
        </ListItem>
        <ListItem sx={{ py: 0, px: 0 }}>
          <ListItemText
            primaryTypographyProps={{
              variant: "termsText",
              ...fontStyles.openSans.regular,
              textAlign: "justify",
            }}
            primary="16.2. The Parties consent to the exclusive jurisdiction and venue in the courts of Mumbai, except that temporary relief to enjoin infringement of intellectual property rights may be sought in any court where such infringement has occurred."
          />
        </ListItem>
      </List>
    </Container>
    </>
  );
};

export default TermsAndConditions;
