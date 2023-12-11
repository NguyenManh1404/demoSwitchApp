import base64 from 'base-64';
import APP_CONFIG from '../config/AppSetting';

const basicAuth =
  'Basic ' +
  base64.encode(
    `${APP_CONFIG.SYNC_REVIEW_USER_NAME}:${APP_CONFIG.SYNC_REVIEW_PASSWORD}`,
  );

const handleSyncReview = async ({postData}: {postData: ISyncReviewData}) => {
  try {
    await fetch(APP_CONFIG.SYNC_REVIEW_END_POINT, {
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
