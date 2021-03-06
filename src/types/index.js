/** File contains common prop type shapes and functions  */
import PropTypes from 'prop-types';

export const ProfileType = PropTypes.shape({
    authenticated: PropTypes.bool,
    username: PropTypes.string,
});

export const ChallengeType = PropTypes.shape({
    number: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
    source: PropTypes.array,
    tags: PropTypes.arrayOf(PropTypes.string),
    body: PropTypes.shape({
        short_description: PropTypes.string,
        description: PropTypes.string,
    }),
    created: PropTypes.string,
    url: PropTypes.string,
    head: PropTypes.shape({
        resolution: PropTypes.string,
        status: PropTypes.string,
        difficulty: PropTypes.string,
        owner: PropTypes.string,
    }),
});

export const ChallengesType = PropTypes.arrayOf(ChallengeType);

export const SubmitType = PropTypes.shape({
    updatedAt: PropTypes.string,
    createdAt: PropTypes.string,
    repo: PropTypes.string,
    demo: PropTypes.string,
    description: PropTypes.string,
    advantage: PropTypes.string,
    struggle: PropTypes.string,
});

export const ShortUserType = PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.shape({
        url: PropTypes.string,
    }),
});
