import { Header } from "@/components/Header";
import s from "./PrivacyPolicy.module.scss";
import Link from "next/link";

export const PrivacyPolicy = () => {
    return (
        <div className={s.content}>
            <Header />
            <div className={s.privacy_policy}>
                <h1>Privacy Policy</h1>

                <h2>Version: 1.0 | Last updated: February 05, 2025</h2>

                <h2>Table of Contents</h2>
                <ul>
                    <li>Purpose of this Policy</li>
                    <li>How We Collect Your Information</li>
                    <li>How We Use Your Information</li>
                    <li>Security Measures and Data Protection</li>
                    <li>Your Rights and Choices</li>
                    <li>How to Correct or Delete Your Information</li>
                    <li>Changes to This Policy</li>

                </ul>

                <h2 id="purpose">Purpose of this Policy</h2>
                <p>This Privacy Policy describes how your personal information is collected, used, and safeguarded by our website. The purpose of this policy is to ensure transparency about our data practices and give you control over your personal information.</p>

                <h2 id="data-collection">How We Collect Your Information</h2>
                <p>We only collect personal information when you use our website or services. This includes, but is not limited to, information provided through:</p>
                <ul>
                    <li>Creating an account (e.g.,fitness and eating plans)</li>
                    <li>Filling out forms on our website</li>
                    <li>Using our services (e.g., tracking or monitoring your fitness progress)</li>
                    <li>Your interactions with us (e.g., chat support, customer service)</li>
                </ul>
                <p>We collect this information to improve our products and services, provide you with a better experience, and comply with legal obligations.</p>

                <h2 id="use-of-data">How We Use Your Information</h2>
                <p>Your personal information is used solely for the following purposes:</p>
                <ul>
                    <li>To improve and personalize our website and services</li>
                    <li>To analyze website traffic and user behavior</li>
                    <li>To provide you with fitness and eating plan recommendations</li>
                    <li>To communicate with you about updates, features, or marketing</li>
                    <li>Compliantly with legal requirements</li>
                </ul>

                <h2 id="security-measures">Security Measures and Data Protection</h2>
                <p>We take reasonable steps to protect your personal information from unauthorized access, use, disclosure, or disposal. We implement industry-standard security measures to safeguard your data while it is in transit and at rest. However, no method of transmission over the internet is 100% secure, so we cannot guarantee absolute security.</p>

                <h2 id="user-rights-and-choices">Your Rights and Choices</h2>
                <ul>
                    <li><strong>Access Your Information:</strong> You may access your personal information by providing us with written notice at <Link href="mailto:sevenhist@gmail.com">sevenhist@gmail.com</Link></li>
                    <li><strong>Correct or Erase Information:</strong> You may request the correction or erasure of your personal information by providing us with a written notice.</li>
                    <li><strong>Delete Your Account:</strong> You may request deletion of your account and all associated data through the Contact Us page.</li>
                    <li><strong>Data Minimization:</strong> We only collect and use the minimum amount of personal information necessary to fulfill our obligations to you.</li>
                </ul>

                <h2 id="corrections">How to Correct or Delete Your Information</h2>
                <p>Please contact us at <Link href="mailto:sevenhist@gmail.com">sevenhist@gmail.com</Link> with your request for corrections, deletions, or updates to your personal information.</p>

                <h2 id="changes-to-this-policy">Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. Any changes will be posted on our website and updated in this policy. Your continued use of our site after these changes constitutes acceptance of the revised policy.</p>
            </div>
        </div>
    );
};


