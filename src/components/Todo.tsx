import {Button, Card, CardActions, CardHeader} from "@mui/material";
import type {FC} from "react";

type Props = {
    title: string
}

const Todo: FC<Props> = ({title}) => {
    return (
        <Card color={'primary'}>
            <CardHeader title={title}/>
            <CardActions style={{justifySelf: 'end'}}>
                <Button>
                    Remove
                </Button>
            </CardActions>
        </Card>
    )
}

export default Todo;
