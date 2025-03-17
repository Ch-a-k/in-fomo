import { useRouter } from 'next/router';
import Head from 'next/head';

interface SchemaOrgProps {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  organizationName?: string;
  authorName?: string;
}

const SchemaOrg: React.FC<SchemaOrgProps> = ({
  title,
  description,
  canonicalUrl,
  imageUrl,
  datePublished,
  dateModified,
  organizationName = 'InFomo',
  authorName = 'InFomo Team',
}) => {
  const router = useRouter();
  const currentUrl = `${canonicalUrl}${router.asPath}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${canonicalUrl}#organization`,
        name: organizationName,
        url: canonicalUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${canonicalUrl}/logo.png`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${canonicalUrl}#website`,
        url: canonicalUrl,
        name: title,
        publisher: {
          '@id': `${canonicalUrl}#organization`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': currentUrl,
        url: currentUrl,
        name: title,
        description: description,
        isPartOf: {
          '@id': `${canonicalUrl}#website`,
        },
        ...(datePublished && { datePublished }),
        ...(dateModified && { dateModified }),
        author: {
          '@type': 'Person',
          name: authorName,
        },
        image: imageUrl ? {
          '@type': 'ImageObject',
          url: imageUrl,
        } : undefined,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${currentUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': canonicalUrl,
              name: 'Home',
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@id': currentUrl,
              name: title,
            },
          },
        ],
      },
    ],
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

export default SchemaOrg; 