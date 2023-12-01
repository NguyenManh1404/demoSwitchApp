import base64 from 'base-64';
import Config from 'react-native-config';

const basicAuth =
  'Basic ' +
  base64.encode(
    `${Config.SYNC_REVIEW_USER_NAME}:${Config.SYNC_REVIEW_PASSWORD}`,
  );

const handleSyncReview = async ({postData}: {postData: ISyncReviewData}) => {
  try {
    await fetch(Config.SYNC_REVIEW_END_POINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: basicAuth,
      },
      body: JSON.stringify(postData),
    });
    // Handle the response data as needed
    // const response =
    // const data = await response.json();
  } catch (error) {}
};

export {handleSyncReview};
