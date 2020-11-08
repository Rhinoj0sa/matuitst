import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {MD5} from './../../services/userService'

const useStyles = makeStyles({
//   root: {
//     maxWidth: 345
//   },
  media: {
    width:200,
    height: 200
  }
});

export default function MediaCard({email}) {
  debugger
  console.log(email)
  const img='https://www.gravatar.com/avatar/'+ MD5(email)+'?s=200'
  console.log('img',img)
  const classes = useStyles();
  return (
    <Card className={classes.media}>
      <CardActionArea>
        <CardMedia
           className={classes.media}
          image={img}
          title="titulo!!!!"
        />
      </CardActionArea>
    </Card>
  );
}

//  {/* <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
            
//           </Typography>
//           <Typography
//             variant="body2"
//             color="textSecondary"
//             component="p"
//           ></Typography>
//         </CardContent> */}