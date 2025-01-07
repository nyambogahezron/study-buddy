import { LitElement, html } from 'lit';


class TopicList extends LitElement {
  static styles = `
    .btn--link {
      display: flex;
      align-items: center;
    }
    .btn--link svg {
      margin-left: 0.5rem;
    }
  `;

  render() {
    return html`
      <ul>
        <li>
          <a href="/">React <span>57</span></a>
        </li>
        <li>
          <a href="/">Database <span>90</span></a>
        </li>
        <li>
          <a href="/">AI <span>20</span></a>
        </li>
        <li>
          <a href="/">Computer Sc <span>91</span></a>
        </li>
        <li>
          <a href="/">Linux <span>40</span></a>
        </li>
      </ul>
      <a class="btn btn--link" href="topics.html">
        More
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <title>chevron-down</title>
          <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>
        </svg>
      </a>
    `;
  }
}

class RoomList extends LitElement {
  static styles = `
    .roomListRoom__author {
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .roomListRoom__actions {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      position: relative;
    }
    .roomListRoom__actions svg {
      fill: var(--color-main);
      width: 1.6rem;
      height: 1.6rem;
    }
    .roomListRoom__content a {
      font-size: 1.8rem;
      font-weight: 600;
      text-transform: capitalize;
      margin-bottom: 1.5rem;
      color: var(--color-main);
      transition: all 0.3s ease-in-out;
    }
    .roomListRoom__content a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <div class="activities__box">
        <div class="activities__boxHeader roomListRoom__header">
          <a href="profile.html" class="roomListRoom__author">
            <div class="avatar avatar--small">
              <img src="./assets/images/user.png" />
            </div>
            <p>
              @john_doe
              <span>5 days ago</span>
            </p>
          </a>
          <div class="roomListRoom__actions">
            <a href="#">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <title>remove</title>
                <path
                  d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div class="activities__boxContent">
          <p>
            replied to post “<a href="room.html">100 Days of code challenge!</a
            >”
          </p>
          <div class="activities__boxRoomContent">
            I’ll have to try this sometime. Really like this idea. Wanna talk
            about it? I’m...
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('topic-list', TopicList);
customElements.define('room-list', RoomList);
