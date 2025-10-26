const Url = require('../models/Url');
const { generateSlug } = require('../services/idService');

function normalizeUrl(orig) {
  try {
    if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(orig)) {
      orig = 'http://' + orig;
    }
    return new URL(orig).toString();
  } catch (err) {
    return null;
  }
}

exports.createUrl = async (req, res) => {
  try {
    const { target, slug: requestedSlug, expiresAt } = req.body;
    if (!target) return res.status(400).json({ error: 'target is required' });

    const normalizedTarget = normalizeUrl(target);
    if (!normalizedTarget) return res.status(400).json({ error: 'invalid URL' });

    let slug = requestedSlug ? String(requestedSlug) : generateSlug();
    slug = slug.replace(/[^a-zA-Z0-9-_]/g, '').slice(0, 64);

    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const doc = new Url({
          slug,
          target: normalizedTarget,
          expiresAt: expiresAt || null
        });
        await doc.save();
        const base = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
        return res.status(201).json({ shortUrl: `${base}/${slug}`, slug, target: normalizedTarget });
      } catch (err) {
        if (err.code === 11000) {
          slug = generateSlug();
          continue;
        }
        console.error(err);
        return res.status(500).json({ error: 'server error' });
      }
    }

    return res.status(500).json({ error: 'could not generate unique slug' });
  } catch (err) {
    console.error('createUrl error', err);
    return res.status(500).json({ error: 'server error' });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) return res.status(400).send('Bad Request');

    const url = await Url.findOneAndUpdate({ slug }, { $inc: { clicks: 1 } }, { new: true }).lean();
    if (!url) return res.status(404).send('Not found');
    return res.redirect(url.target);
  } catch (err) {
    console.error('redirectUrl error', err);
    return res.status(500).send('Server error');
  }
};
