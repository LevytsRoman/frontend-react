import React, { Component } from 'react';
import { ChallengeType } from '../../types';
import TintedHeader from '../misc/TintedHeader';
import DifficultyStars from '../misc/difficulty';
import Tags from '../misc/tags';
import Moment from 'moment';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

class SingleChallenge extends Component {
    static propTypes = {
        challenge: ChallengeType,
    }

    render() {
        const { challenge } = this.props;
        return(
            <div>
                <TintedHeader title={challenge.title} subtitle={ challenge.body.short_description } />
                <section className="container">
                    <div className="content challenge">
                        <div className="ticket-data row pricing">
                            <div className="col-sm-6 plan">
                                <ul className="features">
                                    <li>
                                        <i className="icon-user" />
                                        <strong>Owner:</strong> {challenge.head.owner}
                                    </li>
                                    <li>
                                        <i className="icon-asterisk" />
                                        <strong>Difficulty:</strong>
                                        <DifficultyStars difficulty={ challenge.head.difficulty } />
                                    </li>
                                    <li>
                                        <i className="icon-th-list" />
                                        <strong>Type:</strong> { challenge.head.challenge_type }
                                    </li>
                                    <li>
                                        <i className="icon-user" />
                                        <strong>Asigned to:</strong> Me
                                    </li>
                                </ul>
                            </div>
                            <div className="col-sm-6 plan">
                                <ul className="features">
                                    <li>
                                        <i className="icon-calendar" />
                                        <strong>Date Created:</strong> { Moment(challenge.head.date_created).format() }
                                    </li>
                                    <li>
                                        <i className="icon-attention-circle" />
                                        <strong>Priority:</strong> {challenge.head.priority}
                                    </li>
                                    <li>
                                        <i className="icon-help-circle" />
                                        <strong>Status:</strong> { challenge.head.status }
                                    </li>
                                    <li>
                                        <i className="icon-block-1" />
                                        <strong>Resolution:</strong> { challenge.head.resolution }
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row tags">
                            <p>
                                <i className="icon-tags" />
                                <strong>Tags:</strong>
                                <Tags tags={ challenge.tags } />
                            </p>
                        </div>
                        <a className="anchor" id="description" />
                        <div className="grey-box">
                            <h2>Description</h2>
                            <div className="description">
                                <ReactMarkdown source={ challenge.body.description } />
                            </div>
                            <a className="anchor" id="attachments" />
                            <h2>Attachments</h2>
                            <div className="attachments">
                                <ul>
                                    {challenge.body.attachments.map((a, key) => (
                                        <li key={ key }>
                                            <i className="icon-install" />
                                            <a href="{{url}}" title="{{name}}" target="_blank">
                                                {{name}}
                                            </a>
                                        </li>
                                    ))}
                                    {(!challenge.body.attachments || challenge.body.attachments.length < 1 ) &&
                                        <li>This challenge does not have any attachments.</li>}
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <Link to={ `/challenge/submit${challenge.id}` } className="btn btn-large">
                                Submit Answer <i className="icon icon-right-1" />
                            </Link>
                        </div>
                        <a className="anchor" id="technical" />
                        <h2>Technical Notes</h2>
                        <div className="technical-notes">
                            <ReactMarkdown source={challenge.technical_notes} />
                            <p>When you're done, push to your repo and submit your answer.</p>
                        </div>
                        <a className="anchor" id="source" />
                        <h2>Source:</h2>
                        <div className="source">
                            {challenge.source.map((s, key) => (
                                <p key={ key }>
                                    <strong>{s.name}</strong>
                                    <Link to={s.url}>{ s.url }</Link>
                                </p>
                            ))}
                        </div>
                        <a className="anchor" id="procedure" />
                        <h2>Procedure:</h2>
                        <div className="procedure">
                            <ReactMarkdown source={ challenge.procedure } />
                            <p>Look at our <Link to="/learning">help</Link> section for more information about this.</p>
                        </div>
                        <a className="anchor" id="coding" />
                        <h2>Coding</h2>
                        <div className="coding">
                            {challenge.coding && <ReactMarkdown source={ challenge.coding } />}
                            {!challenge.coding &&
                                <div>
                                    <p>To create your answer follow this steps:</p>
                                    <ol>
                                        <li><a href="https://help.github.com/articles/fork-a-repo/">Fork</a>
                                            the repo to your account, or download the zip file</li>
                                        <li>Solve the ticket</li>
                                        <li>Commit your code</li>
                                        <li>Push your changes</li>
                                        <li>Publish your version in <a href="https://pages.github.com/">Github Pages</a> or
                                            <a href="https://firebase.google.com/docs/hosting/">Firebase Hosting</a></li>
                                        <li>Submit your response</li>
                                    </ol>
                                </div>
                            }
                        </div>
                        <a className="anchor" id="troubleshooting" />
                        <h2>Troubleshooting | Help</h2>
                        <div className="troubleshooting">
                            <p>If you have need clarification with the project, files, or description, open an issue on github.</p>
                            <p>For questions with the platform, email us at support@codecorgi.co</p>
                            <p>For help with github or coding, consult our <Link to="/learning">Learning and Resources</Link> page,
                            where you will find information and links to tutorials and other content.</p>
                        </div>
                        <div className="row">
                            <Link to={ `/challenge/submit/${challenge.id}` } className="btn btn-large">
                                Submit Answer <i className="icon icon-right-1" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default SingleChallenge;