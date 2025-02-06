import React from 'react';
import s from './About.module.scss';
import { Typography } from '@/components/Typography';
import alex from "../../assets/img/alex.png"
import dima from "../../assets/img/dima.png"
import veronika from "../../assets/img/veronika.png"
import Image from 'next/image';

export const About = () => {
  return (
    <div className={s.aboutContainer}>
      <div className={s.header}>
        <h2>About Us</h2>
        <p>
          Our open-source, free-to-use fitness and nutrition web app is designed to empower users on their journey to a healthier lifestyle.
          We believe that everyone should have access to high-quality tools that support their fitness and nutritional goals without barriers.
        </p>
      </div>

      <div className={s.content}>
        <div className={s.contentBox}>
          <div className={s.contentBox__about}>
            <h2>Our Mission</h2>
            <p>
              We aim to provide a user-friendly and accessible platform for fitness tracking, meal planning, and health insights.
              By leveraging open-source technology, we foster a community-driven approach to health and wellness.
            </p>
          </div>
          <div className={s.contentBox__about}>
            <h2>Core Values</h2>
            <div className={s.valuesGrid}>
              <div className={s.valueItem}>
                <h3>Accessibility</h3>
                <p>Ensuring everyone has free access to reliable fitness and nutrition resources.</p>
              </div>
              <div className={s.valueItem}>
                <h3>Transparency</h3>
                <p>Open-source development encourages collaboration and trust.</p>
              </div>
              <div className={s.valueItem}>
                <h3>Community</h3>
                <p>Building a supportive network where users can share knowledge and progress.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.teamSection}>
        <div className={s.teamSection__about}>
          <h2 className={s.teamSection__about__title}>Our Team</h2>
          <p>
            Meet the passionate individuals behind our platform who are committed to making health and fitness accessible to everyone.
          </p>
        </div>
        <div className={s.teamSection__team}>
          <div className={s.teamSection__profile}>
            <Image src={dima} className={s.teamSection__picture} alt='image' />
            <div className={s.teamSection__profile__info}>
              <h3>Dmytro Rudnenko</h3>
              <p className={s.teamSection__profile__role}>Founder and Developer</p>
              <p className={s.teamSection__profile__description}>
                Full-stack developer with a passion for creating intuitive user experiences and scalable solutions.
              </p>
            </div>
          </div>
          <div className={s.teamSection__profile}>
            <Image className={s.teamSection__picture} src={alex} alt='image' />
            <div className={s.teamSection__profile__info}>
              <h3>Alexander Leitner</h3>
              <p className={s.teamSection__profile__role}>Founder and Developer</p>
              <p className={s.teamSection__profile__description}>
                Full-stack developer with a passion for creating intuitive user experiences and scalable solutions.
              </p>
            </div>
          </div>
          <div className={s.teamSection__profile}>
            <Image className={s.teamSection__picture} src={veronika} alt='image' />
            <div className={s.teamSection__profile__info}>
              <h3>Veronika Majorova</h3>
              <p className={s.teamSection__profile__role}>Designer and Developer</p>
              <p className={s.teamSection__profile__description}>
                Designer and developer with a passion for creating intuitive user experiences and scalable solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};