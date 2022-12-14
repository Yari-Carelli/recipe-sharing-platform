import React from 'react';
import { Container, Media } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Event.module.css';


function Event(props) {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    created_at,
    updated_at,
    title,
    content,
    date,
    time,
    location,
    price,
    event_link,
    eventPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  /**
   * Route user to Edit page for Event
   */
  const handleEdit = () => {
    history.push(`/events/${id}/edit`);
  };

  /**
   * Delete Event from API.
   */
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/events/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Container className={styles.Container}>
      <br />
      <Link className={styles.OnHover} to={`/events/${id}`}>
        <h2 className={styles.OnHover}>
          <strong>{title}</strong>
        </h2>
      </Link>
      <p>Last updated: {updated_at}</p>
      <Media>
        <Link to={`events/${profile_id}`} className={styles.OnHover}>
          <Avatar src={profile_image} height={30} />
          <p className={styles.OnHover}>Submitted by: {owner}</p>
        </Link>

        {is_owner && eventPage && (
          <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
        )}
      </Media>

      <p>{content}</p>
      <p>
        Date: {date} | Time: {time} | Admission: ${price}
      </p>
      <p>
        Location: {location}
      </p>
      <p>
        For more information, visit the event page:
        {' '}
        <a
          target="_blank"
          rel="noreferrer"
          href={event_link}
          className={styles.OnHover}
        >
          <strong>HERE</strong>
        </a>
      </p>
      <p>
        Submitted:
        {' '}
        {created_at}
      </p>
      <br />
    </Container>
  );
}

export default Event;