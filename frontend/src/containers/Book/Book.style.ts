import styled from "styled-components";
import {AmplifyS3Image} from "@aws-amplify/ui-react";

export const BookContainer = styled.div`
	margin: 0 4rem 8rem 4rem;
`;

export const ImageStyle = styled.img`
	width: 90%;
	box-shadow: 5px 5px 10px black;
`;

export const ButtonsRowStyle = styled.div`
	margin-top: 2rem;
`;

export const AWSImage = styled(AmplifyS3Image)`
	--height: 560px;
  	--width: 360px;
	box-shadow: 5px 5px 10px black;
`;